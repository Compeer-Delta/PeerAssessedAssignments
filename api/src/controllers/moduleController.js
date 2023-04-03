// Description: This file contains the functions that will be used to create, read, update and delete modules
import Module from "../schemas/module.js";
import User from "../schemas/user.js";
import submission from "../schemas/submission.js";
import Institution from "../schemas/institution.js";
import mongoose from "mongoose";

// create module
const createModule = async (req, res) => {
  const {
    title,
    description,
    teachers,
    students,
    assignments,
    institutionName,
    moduleCode,
  } = req.body;
  const module = new Module({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    moduleCode: moduleCode,
    description: description,
    teachers: teachers,
    students: students,
    assignments: assignments,
    institutionName: institutionName,
  });
  try {
    const savedModule = await module.save();
    await Institution.updateOne(
      { name: institutionName.toLowerCase() },
      { $push: { modules: module._id } }
    );
    res.status(201).json(savedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get module by id
const getModule = async (req, res) => {
  const { moduleCode, institutionName } = req.query;
  try {
    const foundModule = await Module.findOne({
      moduleCode: moduleCode,
      institutionName: institutionName.toLowerCase(),
    });
    res.status(201).json(foundModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update module
const updateModule = async (req, res) => {
  const { moduleId, moduleTitle, moduleDescription, moduleContent } = req.body;
  try {
    const updateModule = await Module.updateOne(
      { moduleId: moduleId },
      {
        $set: {
          moduleTitle: moduleTitle,
          moduleDescription: moduleDescription,
          moduleContent: moduleContent,
        },
      }
    );
    const updatedModule = await updateModule.save();
    await Institution.updateOne(
      { name: institutionName.toLowerCase() },
      { $push: { modules: module._id } }
    );
    res.status(201).json(updatedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete module
const deleteModule = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const deletedModule = await Module.findByIdAndDelete({
      moduleId: moduleId,
    });

    if (!deletedModule) {
      return res.status(404).json({ message: "Cannot find module" });
    }
    res.status(201).json(deletedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get modules of specific user
const getModules = (req, res) => {
  const { email } = req.query;
  Module.find({
    $or: [
      { students: { $regex: email, $options: "i" } },
      { teachers: { $regex: email, $options: "i" } },
    ],
  }) // find modules where user is student or teacher
    .then((modules) => {
      res.status(201).json(modules);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// get teachers firstname, lastname & email of specific module
const getModuleTeachers = async (req, res) => {
  const { moduleId } = req.query;
  try {
    const module = await Module.findOne({ moduleId: moduleId });
    const teachers = await User.find({
      email: { $in: module.teachers },
    }).select("firstname surname email");
    res.status(201).json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add student/s to module
const addStudentToModule = async (req, res) => {
  const { moduleId, studentEmails } = req.body;
  try {
    const module = await Module.findOne({ moduleId: moduleId });
    // check if module exists
    if (!module) {
      return res.status(404).json({ message: "Cannot find module" });
    }

    // check if students exist
    const students = await User.find({ email: { $in: studentEmails } });

    // check if all students exist
    if (students.length !== studentEmails.length) {
      const notFound = studentEmails.filter((email) => {
        return !students.some((student) => student.email === email);
      });
      return res.status(404).json({ message: `Cannot find ${notFound}` });
    }

    module.students.push(...students); // add students to module
    const updatedModule = await module.save();
    res.status(201).json(updatedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add teacher/s to module
const addTeacherToModule = async (req, res) => {
  const { moduleId, teacherEmails } = req.body;
  try {
    const module = await Module.findOne({ moduleId: moduleId });
    // check if module exists
    if (!module) {
      return res.status(404).json({ message: "Cannot find module" });
    }

    // check if teachers exist
    const teachers = await User.find({ email: { $in: teacherEmails } });

    // check if all teachers exist
    if (teachers.length !== teacherEmails.length) {
      const notFound = teacherEmails.filter((email) => {
        return !teachers.some((teacher) => teacher.email === email);
      });
      return res.status(404).json({ message: `Cannot find ${notFound}` });
    }

    module.teachers.push(...teachers); // add teachers to module
    const updatedModule = await module.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// remove student/s from module
const removeStudentFromModule = async (req, res) => {
  const { moduleId, studentEmails } = req.body;
  try {
    const module = await Module.findOne({ moduleId: moduleId });
    // check if module exists
    if (!module) {
      return res.status(404).json({ message: "Cannot find module" });
    }

    // check if students exist
    const students = await User.find({ email: { $in: studentEmails } });

    // check if all students exist
    if (students.length !== studentEmails.length) {
      const notFound = studentEmails.filter((email) => {
        return !students.some((student) => student.email === email);
      });
      return res.status(404).json({ message: `Cannot find ${notFound}` });
    }

    // remove students from module
    module.students = module.students.filter((student) => {
      return !studentEmails.includes(student);
    });

    // save updated module
    const updatedModule = await module.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// remove teacher/s from module
const removeTeacherFromModule = async (req, res) => {
  const { moduleId, teacherEmails } = req.body;
  try {
    const module = await Module.findOne({ moduleId: moduleId });
    // check if module exists
    if (!module) {
      return res.status(404).json({ message: "Cannot find module" });
    }

    // check if teachers exist
    const teachers = await User.find({ email: { $in: teacherEmails } });

    // check if all teachers exist
    if (teachers.length !== teacherEmails.length) {
      const notFound = teacherEmails.filter((email) => {
        return !teachers.some((teachers) => teachers.email === email);
      });
      return res.status(404).json({ message: `Cannot find ${notFound}` });
    }

    // remove teachers from module
    module.teachers = module.teachers.filter((teachers) => {
      return !teacherEmails.includes(teachers);
    });

    // save updated module
    const updatedModule = await module.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add submission
const addSubmission = async (req, res) => {
  const { moduleId, submissionId, userId, binData } = req.body;
  const newSubmission = new submission({
    _id: new mongoose.Types.ObjectId(),
    moduleId: moduleId,
    submissionId: submissionId,
    userId: userId,
    binData: binData,
  });
  try {
    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all submissions of specific module & assignment
const getSubmissions = async (req, res) => {
  const { moduleId, assignmentId, submissionId } = req.body;
  try {
    const foundSubmission = await submission.findOne({
      moduleId: moduleId,
      assignmentId: assignmentId,
      submissionId: submissionId,
    });
    if (foundSubmission === null) {
      return res.status(404).json({ message: "Cannot find submission" });
    } else {
      res.status(201).json(foundSubmission);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all modules (no params)
const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.status(200).json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createModule,
  getModule,
  updateModule,
  deleteModule,
  getModules,
  getModuleTeachers,
  addSubmission,
  getSubmissions,
  addStudentToModule,
  addTeacherToModule,
  removeTeacherFromModule,
  removeStudentFromModule,
  getAllModules,
};

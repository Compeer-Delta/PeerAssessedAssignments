import Module from "../schemas/module.js";
import User from "../schemas/user.js";
import submission from "../schemas/submission.js";
import mongoose from "mongoose";

const createModule = async (req, res) => {
  const {
    title,
    description,
    teachers,
    students,
    assignments,
    institutionName,
  } = req.body;
  const module = new Module({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    teachers: teachers,
    students: students,
    assignments: assignments,
    institutionName: institutionName,
  });
  try {
    const savedModule = await module.save();
    res.status(201).json(savedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getModule = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const foundModule = Module.findOne({ moduleId: moduleId });
    res.status(201).json(foundModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    res.status(201).json(updatedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
const getModules = async (req, res) => {
  const { email } = req.body;
  try {
    //const user = await User.findOne({ email: email });
    //const foundModules = await Module.find({ students: user._id });
    const modules = await Module.find({ students: { $regex: email, $options: 'i' } });
    res.status(201).json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const giveFeedback = async (req, res) => {
  const { moduleId, submissionId, marker, comment, rating, marked } = req.body;
  try {
    const feedback = { marker: marker, comment: comment, rating: rating };
    const updatedSubmission = await submission.updateOne(
      { moduleId: moduleId, submissionId: submissionId },
      { $push: { feedback: feedback }, $set: { marked: marked } }
    );
    res.status(201).json(updatedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewFeedback = async (req, res) => {
  const { moduleId, submissionId, marker } = req.body;
  try {
    const foundSubmission = await submission.findOne(
      {
        moduleId: moduleId,
        submissionId: submissionId,
        feedback: { $elemMatch: { userId: { $eq: `${marker}` } } },
      },
      { "feedback.$": 1 }
    );

    if (foundSubmission === null) {
      return res.status(404).json({ message: "Cannot find submission" });
    } else {
      res.status(201).json(foundSubmission.feedback);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFeedback = async (req, res) => {
  const { moduleId, submissionId, marker } = req.body;
  try {
    const deletedFeedback = await submission.findOneAndUpdate(
      { submissionId: submissionId, moduleId: moduleId },
      { $pull: { feedback: { marker: marker } } },
      { new: true }
    );
    if (deletedFeedback === null) {
      return res.status(404).json({ message: "Cannot find submission" });
    }
    res.status(201).json(deletedFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addSubmission = async (req, res) => {
  const { moduleId, submissionId, userId, submissionContent } = req.body;
  const newSubmission = new submission({
    _id: new mongoose.Types.ObjectId(),
    moduleId: moduleId,
    submissionId: submissionId,
    userId: userId,
    binData: binData,
  });
};

const getSubmissions = async (req, res) => {
  const { moduleId, submissionId } = req.body;
  try {
    const foundSubmission = await submission.findOne({
      moduleId: moduleId,
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

export default {
  createModule,
  getModule,
  updateModule,
  deleteModule,
  getModules,
  addSubmission,
  getSubmissions,
  giveFeedback,
  viewFeedback,
  deleteFeedback,
};

import Submission from "../schemas/submission.js";
import Assignment from "../schemas/assignment.js";
import Module from "../schemas/module.js";
import mongoose from "mongoose";

// Create User Assignment Submission
const createSubmission = async (req, res) => {
  const { userId, moduleId, submissionId, binData } = req.body;
  const submissionContent = new Submission({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    moduleId: moduleId,
    submissionId: submissionId,
    binData: binData,
  });
  try {
    const savedSubmission = await submissionContent.save();
    res.status(201).json(savedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User Assignment Submission
const getSubmission = async (req, res) => {
  const { userId, moduleId, submissionId } = req.params;
  try {
    const foundSubmission = await Submission.findOne({
      submissionId: submissionId,
      userId: userId,
      moduleId: moduleId,
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

// Update User Assignment Submission
const updateSubmission = async (req, res) => {
  const { userId, submissionId, binData, marker, marked } = req.params;
  if (marked) {
    try {
      const updatedSubmission = await Submission.updateOne(
        { userId: userId, submissionId: submissionId },
        { $set: { marked: marked } }
      );
      res.status(201).json(updatedSubmission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  if (marker) {
    try {
      const updatedSubmission = await Submission.updateOne(
        { userId: userId, submissionId: submissionId },
        { $push: { marker: marker } }
      );
      res.status(201).json(updatedSubmission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  if (binData) {
    try {
      const updatedSubmission = await Submission.updateOne(
        { userId: userId, submissionId: submissionId },
        { $set: { binData: binData } }
      );
      res.status(201).json(updatedSubmission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

// Delete user assignment submission
const deleteSubmission = async (req, res) => {
  const { userId, moduleId, submissionId } = req.params;
  try {
    const submission = await Submission.findOne({
      submissionId: submissionId,
      userId: userId,
      moduleId: moduleId,
    });
    if (!submission)
      return res.status(404).json({ message: "Cannot find submission" });

    if (submission.userId === req.userId) {
      return res.status(401).json({ message: "Cannot delete this submission" });
    }
    const deletedSubmission = await Submission.findOneAndDelete({
      submissionId: submissionId,
      userId: userId,
      moduleId: moduleId,
    });
    res.status(201).json(deletedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new assignment to module
const addAssignment = async (req, res) => {
  const {
    supervisorId,
    moduleId,
    title,
    description,
    brief,
    startDate,
    endDate,
    numOfReviewers,
    imageURL,
    teachers,
    students,
  } = req.body;

  const setAssignment = new Assignment({
    _id: new mongoose.Types.ObjectId(),
    supervisorId: supervisorId,
    moduleId: moduleId,
    title: title,
    description: description,
    brief: brief,
    startDate: startDate,
    endDate: endDate,
    imageURL: imageURL,
    numOfReviewers: numOfReviewers,
    teachers: teachers,
    students: students,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const savedAssignment = await setAssignment.save();
    const assignmentId = savedAssignment.assignmentId;

    const updatedModule = await Module.findOneAndUpdate(
      { moduleId: moduleId },
      { $push: { assignments: assignmentId } },
      { new: true }
    );

    await session.commitTransaction();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update assignment details
const updateAssignment = async (req, res) => {
  const {
    moduleId,
    assignmentId,
    supervisorId,
    assignmentTitle,
    assignmentDescription,
    assignmentBreif,
    assignmentReviewers,
    assignmentStart,
    assignmentDeadline,
    imageURL,
  } = req.body;

  try {
    const setAssignment = await Module.updateOne(
      { moduleId: moduleId, "assignments.assignmentId": assignmentId },
      {
        $set: {
          "assignments.$.supervisorId": supervisorId,
          "assignments.$.assignmentTitle": assignmentTitle,
          "assignments.$.assignmentDescription": assignmentDescription,
          "assignments.$.assignmentBreif": assignmentBreif,
          "assignments.$.assignmentReviewers": assignmentReviewers,
          "assignments.$.assignmentStart": assignmentStart,
          "assignments.$.assignmentDeadline": assignmentDeadline,
          "assignments.$.imageURL": imageURL,
        },
      }
    );
    res.status(201).json(setAssignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get particular assignment details
const getAssignment = async (req, res) => {
  const { assignmentId } = req.query;
  try {
    const foundAssignment = await Assignment.findOne({
      assignmentId: assignmentId,
    });

    if (!foundAssignment) {
      return res.status(404).json({ message: "Cannot find assignment" });
    }
    res.status(201).json(foundAssignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete assignment by assignmentId and moduleId
const deleteAssignment = async (req, res) => {
  const { moduleId, assignmentId } = req.body;
  try {
    const deletedAssignment = await Module.updateOne(
      { moduleId: moduleId },
      { $pull: { assignments: { assignmentId: assignmentId } } }
    );

    res.status(201).json(deletedAssignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignment,
};

import Submission from "../schemas/submission.js";
import Module from "../schemas/module.js";
import mongoose from "mongoose";

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

const getSubmission = async (req, res) => {
  const { userId, moduleId, submissionId } = req.params;
  try {
    const foundSubmission = await Submission.findOne({
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

const updateSubmission = async (req, res) => {
  const { userId, submissionId, binData, markerId, marked } = req.params;
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
  if (markerId) {
    try {
      const updatedSubmission = await Submission.updateOne(
        { userId: userId, submissionId: submissionId },
        { $push: { markerId: markerId } }
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

const addAssignment = async (req, res) => {
  const {
    moduleId,
    assignmentId,
    supervistorId,
    assignmentTitle,
    assignmentDescription,
    assignmentBreif,
    assignmentReviewers,
    assignmentStart,
    assignmentDeadline,
    imageURL,
  } = req.body;
  const assignmentData = {
    assignmentId: assignmentId,
    supervistorId: supervistorId,
    assignmentTitle: assignmentTitle,
    assignmentDescription: assignmentDescription,
    assignmentBreif: assignmentBreif,
    assignmentReviewers: assignmentReviewers,
    assignmentStart: assignmentStart,
    assignmentDeadline: assignmentDeadline,
    imageURL: imageURL,
    submissions:[],
  };

  const setAssignment = await Module.updateOne(
    { moduleId: moduleId },
    {
      $push: { assignments: assignmentData },
    },
    { upsert: true }
  );

  try {
    const savedAssignment = await setAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { createSubmission, getSubmission, updateSubmission, addAssignment };

// Description: This file contains the functions that will be used to create, read, update and delete submissions
import Submission from "../schemas/submission.js";
import Assignment from "../schemas/assignment.js";
import Module from "../schemas/module.js";
import mongoose from "mongoose";

// Create User Assignment Submission
const createSubmission = async (req, res) => {
  const { userId, moduleId, assignmentId } = req.body;
  const file = req.file;

  if (!userId || !moduleId || !assignmentId) {
    return res.status(400).json({
      message:
        "Please provide all required fields, missing userId, moduleId or assignmentId",
    });
  }

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const submissionContent = new Submission({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    moduleId: moduleId,
    assignmentId: assignmentId,
    fileName: file.originalname, // file name
    fileType: file.mimetype, // file type e.g. image/jpeg/image/png/excel/pdf
    fileData: file.buffer, // file data in binary format
  });
  try {
    const savedSubmission = await submissionContent.save();
    await Assignment.updateOne(
      { _id: assignmentId },
      { $push: { submissions: savedSubmission._id } }
    );
    res.status(201).json(savedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User Assignment Submission
const getSubmission = async (req, res) => {
  const { userId, moduleId, assignmentId } = req.params;
  try {
    const foundSubmission = await Submission.findOne({
      assignmentId: assignmentId,
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
  const { userId, submissionId, fileData, marker, marked } = req.params;
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
  if (fileData) {
    try {
      const updatedSubmission = await Submission.updateOne(
        { userId: userId, submissionId: submissionId },
        { $set: { fileData: fileData } }
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
    }); // check if submission exists
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

// give feedback to submitted assignment
const giveFeedback = async (req, res) => {
  const { moduleId, submissionId, marker, comment, rating, marked } = req.body;
  try {
    const feedback = { marker: marker, comment: comment, rating: rating };
    const updatedSubmission = await Submission.updateOne(
      { moduleId: moduleId, submissionId: submissionId },
      { $push: { feedback: feedback }, $set: { marked: marked } }
    ); // add feedback to submission
    res.status(201).json(updatedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// view feedback given to submitted assignment
const viewFeedback = async (req, res) => {
  const { moduleId, submissionId, marker } = req.body;
  try {
    const foundSubmission = await Submission.findOne(
      {
        moduleId: moduleId,
        submissionId: submissionId,
        feedback: { $elemMatch: { userId: { $eq: `${marker}` } } },
      },
      { "feedback.$": 1 }
    ); // only return the feedback object

    if (foundSubmission === null) {
      return res.status(404).json({ message: "Cannot find submission" });
    } else {
      res.status(201).json(foundSubmission.feedback);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//teacher approves or rejects feedback given to submitted assignment
const checkFeedback = async (req, res) => {
  const { moduleId, submissionId, marker, approved } = req.body;
  try {
    if (!(approved === "true") && !(approved === "false")) {
      return res.status(404).json({ message: "Invalid input" });
    }
    const updatedSubmission = await Submission.updateOne(
      {
        moduleId: moduleId,
        submissionId: submissionId,
        feedback: { $elemMatch: { userId: { $eq: `${marker}` } } },
      },
      { $set: { "feedback.$.approved": approved } }
    ); // update the approved field of the feedback given by the marker
    res.status(201).json(updatedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all accepted feedback given to submitted assignments of a student
const getAcceptedFeedback = async (req, res) => {
  const { userId, moduleId } = req.params;
  try {
    const foundSubmissions = await Submission.find(
      {
        userId: userId,
        moduleId: moduleId,
        feedback: { $elemMatch: { approved: { $eq: true } } },
      },
      { "feedback.$": 1 }
    ); // get only the accepted feedback
    if (foundSubmissions === null) {
      return res.status(404).json({ message: "Cannot find submission" });
    } else {
      res.status(201).json(foundSubmissions);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete feedback given to submitted assignment
const deleteFeedback = async (req, res) => {
  const { moduleId, submissionId, marker } = req.body;
  try {
    const deletedFeedback = await Submission.findOneAndUpdate(
      { submissionId: submissionId, moduleId: moduleId },
      { $pull: { feedback: { marker: marker } } },
      { new: true }
    ); // delete the feedback given by the marker
    if (deletedFeedback === null) {
      return res.status(404).json({ message: "Cannot find submission" });
    }
    res.status(201).json(deletedFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission,
  giveFeedback,
  viewFeedback,
  checkFeedback,
  getAcceptedFeedback,
  deleteFeedback,
};

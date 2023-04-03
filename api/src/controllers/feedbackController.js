import Submission from "../schemas/submission.js";
import Assignment from "../schemas/assignment.js";
import Module from "../schemas/module.js";
import mongoose from "mongoose";
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
      return res.status(404).json({ message: `Cannot view submission ${submissionId}` });
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
  const { userId } = req.params;
  try {
    const foundSubmissions = await Submission.find(
      {
        userId: userId,
        feedback: { $elemMatch: { approved: true } },
      },
      { "feedback.$": 1 }
    ); // get only the accepted feedback
    if (foundSubmissions.length === 0) {
      return res.status(404).json({ message: `There is no feedback for ${userId}` });
    }

    res.status(201).json(foundSubmissions);
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
      return res.status(404).json({ message: `Cannot delete submission ${submissionId}` });
    }
    res.status(201).json(deletedFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default {
  giveFeedback,
  viewFeedback,
  checkFeedback,
  getAcceptedFeedback,
  deleteFeedback,
};

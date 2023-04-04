import Assignment from "../schemas/assignment.js";
import Module from "../schemas/module.js";
import mongoose from "mongoose";

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
    reviewPeriod,
    isOpen,
    maxMark,
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
    reviewPeriod: reviewPeriod,
    isOpen: isOpen,
    maxMark: maxMark,
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
  const { assignmentId } = req.params;
  const updates = req.body; //

  try {
    const setAssignment = await Module.updateOne(
      { assignmentId: assignmentId },
      {
        $set: {
          "assignments.$": updates,
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
  const { assignmentId } = req.params;
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
  addAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignment,
};

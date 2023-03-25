import Submission from "../schemas/submission.js";
import Assignment from "../schemas/assignment.js";
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

const getAssignment = async (req, res) => {
	try {
		const moduleId = req.query.moduleId;
		const assignmentId = req.query.assignmentId;

		const module = await Module.findOne({ moduleId: moduleId });

		const assignment = module.assignments.find((assignment) => {
			return assignment.assignmentId === assignmentId;
		});

		if (assignment === null) {
			return res.status(404).json({ message: "Cannot find assignment" });
		} else {
			res.status(201).json(assignment);
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

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

//get all modules (no params; admin only)
const getAllAssignments = async (req, res) => {
	try {
	  const assigns = await Assignment.find();
	  res.status(200).json(assigns);
	} catch (err) {
	  res.status(500).json({ message: err.message });
	}
};


export default {
	createSubmission,
	getSubmission,
	updateSubmission,
	addAssignment,
	updateAssignment,
	deleteAssignment,
	getAssignment,
	getAllAssignments
};

//ref: https://discord.com/channels/1023971333706629200/1025103915508838480/1049676345514393650
//created by & Last update: 03/02, gc436
import { Schema, model } from "mongoose";
import { generateUUID } from "../functions/generateUUID.js";

/*
Start of A --------------| End of A (SUBMIT DEADLINE) \-/ PEER REVIEW PERIOD\--------------------------- Marks back
X------------------------------------X/------------------------|--------------------M
X------------------------------------X/---------------M---------|--------------------M
X------------------------------------X/---------------/--------------------M
*/
const assignmentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    assignmentId: {
      type: String,
      required: true,
      default: generateUUID,
      unique: true,
    },
    moduleId: {
      type: String,
      required: true,
      ref: "Module",
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    brief: {
      type: String,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: true,
    },
    reviewPeriod: {
      type: Number,
      required: true,
    }, // Number of days for peer review (after submission deadline) | unix timestamp
    numOfReviewers: {
      type: Number,
      required: true,
      default: 1,
    }, // Number of reviewers per submission
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    maxMark: {
      type: Number,
      required: true,
      default: 100,
    },
    imageURL: {
      type: String,
      default: null,
    },
    teachers: [
      {
        type: String,
        ref: "User",
        index: true,
      },
    ],
    students: [
      {
        type: String,
        ref: "User",
        index: true,
      },
    ],
    submissions: [
      {
        type: String,
        ref: "Submission",
        index: true,
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export default model("Assignment", assignmentSchema, "assignment");

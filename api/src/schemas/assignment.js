//ref: https://discord.com/channels/1023971333706629200/1025103915508838480/1049676345514393650
//created by & Last update: 03/02, gc436
import { Schema, model } from "mongoose";
import { generateUUID } from "../functions/generateUUID.js";

const asssignmentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    assignmentId: {
      type: String,
      required: true,
      default: generateUUID,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    bref: {
      type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    numOfReviewers:{
        type: Number,
        required: true,
        default: 1,
    },
    imageURL:{
        type: String,
        required: true,
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

export default model("Assignment", asssignmentSchema, "assignment");

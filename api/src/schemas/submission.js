//Schema can be used to store the data of the file submitted by a user

//File handling needs to be looked into further, GridFS only used for >16MB
//Work is not allocated to someone and not marked by default, hence the null and false default values
//created by gc436 last updated 02/03 by gc436
import { Schema, model } from "mongoose";
import { generateUUID } from "../functions/generateUUID.js";

const submissionSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    submissionId: {
      type: String,
      required: true,
      default: generateUUID,
    },
    userId: [
      {
        type: String,
        ref: "User",
      },
    ],
    assignmentId: [
      {
        type: String,
        ref: "Assignment",
      },
    ],
    moduleId: [
      {
        type: String,
        ref: "Module",
      },
    ],
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileData: {
      type: Buffer,
      required: true,
    },
    reviewers: [
      {
        type: String,
        ref: "User",
      },
    ],
    feedback: [
      {
        marker: [
          {
            type: String,
            ref: "User",
          },
        ],
        comment: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        approved: {
          type: Boolean,
        },
      },
    ],
    marked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export default model("Submission", submissionSchema, "submission");

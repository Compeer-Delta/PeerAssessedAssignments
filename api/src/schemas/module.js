//ref: https://discord.com/channels/1023971333706629200/1025103915508838480/1049676345514393650
//created by & Last update: 03/02, gc436
import { Schema, model } from "mongoose";
import { generateUUID } from "../functions/generateUUID.js";

const moduleSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    moduleId: {
      type: String,
      required: true,
      default: generateUUID,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    moduleCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    assignments: [
      {
        type: String,
        ref: "Assignment",
        index: true,
      },
    ],
    institutionName: {
      type: String,
      ref: "Institution",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export default model("Module", moduleSchema, "module");

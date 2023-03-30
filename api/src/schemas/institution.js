// This file contains the schema for the institution collection in the database.
// Created by gc436 last updated 02/03 by gc436
import { Schema, model } from "mongoose";
import { generateUUID } from "../functions/generateUUID.js";

const institutionSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    institutionId: {
      type: String,
      required: true,
      default: generateUUID,
    },
    institutionName: {
      type: String,
      required: true,
      default: null,
    },
    institutionEmail: {
      type: String,
      required: true,
      default: null,
    },
    institutionAddress: {
      type: String,
      required: true,
      default: null,
    },
    institutionPhone: {
      type: String,
      required: true,
      default: null,
    },
    modules: [
      {
        type: String,
        ref: "Module",
      },
    ],
    admins: [
      {
        type: String,
        ref: "Admin",
      },
    ],
    users: [
      {
        type: String,
        ref: "User",
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

export default model("Institution", institutionSchema, "institution");

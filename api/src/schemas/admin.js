//created by & Last update: 01/02, gc436
import { Schema, model } from "mongoose";
import { generateUUID } from "../functions/generateUUID.js";

const adminSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    adminId: {
      type: String,
      required: true,
      default: generateUUID,
    },
    firstname: {
      type: String,
      required: true,
      default: null,
    },
    surname: {
      type: String,
      required: true,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    institution: {
      type: String,
      required: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export default model("Admin", adminSchema, "admin");
//export default adminSchema

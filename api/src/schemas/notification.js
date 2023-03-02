//created by jd750 last update: 02/03 by gc436
import { Schema, model } from "mongoose";
import { generateUUID } from "../functions/generateUUID.js";

const notifSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    messageId: {
      type: String,
      required: true,
      default: generateUUID,
    },
    userId: {
      type: String,
      required: true,
      default: null,
    },
    notifTitle: {
      type: String,
      required: true,
      default: null,
    },
    notifContent: {
      type: String,
      required: true,
      default: null,
    },
    urgency: {
      //True = urgent, False = not
      type: Boolean,
      required: true,
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

export default model("Notification", notifSchema, "notification");

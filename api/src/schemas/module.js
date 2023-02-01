//ref: https://discord.com/channels/1023971333706629200/1025103915508838480/1049676345514393650
//created by & Last update: 01/02, gc436
import { Schema, model } from "mongoose";
const moduleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  moduleId: {
    type: String,
    required: true,
    default: null,
  },
  moduleName: {
    type: String,
    required: true,
    default: null,
  },
  institution: {
    type: String,
    required: true,
    default: null
  },
  enrolledTeachers: {
    type: [],
    required: false,
    default: [],
  },
  ongoingAssignments: {
    type: [],
    required: false,
    default: [],
  }
});

export default model("Module", moduleSchema, "module");

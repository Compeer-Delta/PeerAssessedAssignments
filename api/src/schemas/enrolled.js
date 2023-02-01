//created by & Last update: 01/02, gc436
import { Schema, model } from "mongoose";
const enrolledSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
    default: null,
  },
  enrolledModules: {
    type: [],
    required: false,
    default: [],
  }
});

export default model("Enrolled", enrolledSchema, "enrolled");

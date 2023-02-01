//created by & Last update: 01/02, gc436
import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
    default: null,
  },
  details: {
    type: {},
    default: {
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
        required: true,
        default: null,
      },
    },
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
});

export default model("Admin", adminSchema, "admin");
//export default adminSchema

//scholar specific details e.g. name, school, usertype (student or lecturer)
//created & updated by gc436
import { Schema, model } from "mongoose";
const scholarsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
    default: null,
  },
  userNameFirst: {
    type: String,
    required: true,
    default: null,
  },
  userNameLast: {
    type: String,
    required: true,
    default: null,
  },
  userSchool: {
    type: String,
    required: true,
    default: null,
  },
  //is student 0 or teacher 1
  userType: {
    type: {},
    required: true,
    default: {
      isTeacher: 0
    },
  }
});

export default model("Scholars", scholarsSchema, "scholars");

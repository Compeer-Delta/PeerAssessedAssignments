//scholar specific details e.g. name, school, usertype (student or lecturer)
const { Schema, model } = require("mongoose");
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

module.exports = model("Scholars", scholarsSchema, "scholars");

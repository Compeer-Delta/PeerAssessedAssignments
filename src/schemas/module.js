//user at later data or remove entirely
//ref: https://discord.com/channels/1023971333706629200/1025103915508838480/1049676345514393650
const { Schema, model } = require("mongoose");
const moduleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
    default: null,
  },
  enrolledStudents: {
    type: [],
    required: false,
    default: [],
  },
  enrolledTeachers: {
    type: [],
    required: false,
    default: [],
  }
});

module.exports = model("Module", moduleSchema, "module");

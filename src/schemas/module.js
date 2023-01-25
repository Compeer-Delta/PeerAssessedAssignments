//user at later data or remove entirely
//ref: https://discord.com/channels/1023971333706629200/1025103915508838480/1049676345514393650

//Last update: 25/01, jd750
const { Schema, model } = require("mongoose");
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
  }
});

module.exports = model("Module", moduleSchema, "module");

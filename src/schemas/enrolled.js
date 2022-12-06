const { Schema, model } = require("mongoose");
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

module.exports = model("Enrolled", enrolledSchema, "enrolled");

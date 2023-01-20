const { Schema, model } = require("mongoose");
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
        default: null
      },
      surname: {
        type: String,
        required: true,
        default: null
      },
      email: {
        type: String,
        required: true,
        default: null
      },
    },
  },
  school: {
    type: String,
    required: true,
    default: null
  }
});

module.exports = model("Admin", adminSchema, "admin");

const { Schema, model } = require("mongoose");
const adminSchema = new Schema({
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
  userName: {
    type: String,
    required: true,
    default: null,
  },
  userTicket: {
    type: Number,
    required: false,
    default: 0,
  }
});

module.exports = model("Admin", adminSchema, "admin");

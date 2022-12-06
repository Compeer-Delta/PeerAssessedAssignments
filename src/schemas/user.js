//login details
//ref https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
    default: null,
  },
  userPassword: {
    type: String,
    required: true,
    default: null,
  }
});

module.exports = model("User", userSchema, "user");

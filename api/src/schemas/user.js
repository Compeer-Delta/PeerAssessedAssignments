//login details
//ref https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
//created & updated by gc436
import { Schema, model } from "mongoose";
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
    default: null,
  },
  password: {
    type: String,
    required: true,
    default: null
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
  institution: {
    type: String,
    required: true,
    default: null
  },
  enrolledModules: {
    type: [],
    required: true,
    default: [],
  }
});

export default model("User", userSchema, "user");

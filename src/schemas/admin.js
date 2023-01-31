const { Schema, model } = require("mongoose");
//import { Schema, model } from 'mongoose';

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
  institution: {
    type: String,
    required: true,
    default: null
  },
  password: {
    type: String,
    required: true,
    default: null
  }
});

module.exports = model("Admin", adminSchema, "admin");

// const Admin = model("Admin", adminSchema, "admin");
// export default Admin
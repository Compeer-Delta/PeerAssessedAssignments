//Schema can be used to store the data of the file submitted by a user

//File handling needs to be looked into further, GridFS only used for >16MB

const { Schema, model } = require("mongoose");
const moduleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {
      type: String,
      required: true,
      default: null,
    }, 
    moduleId: {
        type: String,
        required: true,
        default: null,
    },
    binData: {
        type: Buffer,
        required: true,
        default: null,
    }
});

module.exports = model("Submission", submittedSchema, "submission");
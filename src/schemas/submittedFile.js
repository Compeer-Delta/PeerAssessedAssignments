//Schema can be used to store the data of the file submitted by a user

//File handling needs to be looked into further, GridFS only used for >16MB
//Work is not allocated to someone and not marked by default, hence the null and false default values

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
    },
    markerId: {
        type: String,
        required: true,
        default: null,
    },
    marked: {
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = model("Submission", submittedSchema, "submission");
//Schema can be used to store the data of the file submitted by a user

//File handling needs to be looked into further, GridFS only used for >16MB
//Work is not allocated to someone and not marked by default, hence the null and false default values
//updated by gc436
import { Schema, model } from "mongoose";
const submissionSchema = new Schema({
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
    submissionId: {
        type: String,
        required: true,
        default: null,
    },
    binData: {
        type: Buffer,
        required: true,
        default: null,
    },
    reviewers:{
        type: [],
        required: true,
    },
    feedback: [{
        markerId: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        approved: {
            type: Boolean,
            required: true,
            default: false,
        }
    }],
    marked: {
        type: Boolean,
        default: false,
    }
});

export default model("Submission", submissionSchema, "submission");

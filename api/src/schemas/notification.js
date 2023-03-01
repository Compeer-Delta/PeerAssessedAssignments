//created by & Last update: 24/02, jd750
import { Schema, model } from "mongoose";

const notifSchema = new Schema({
    _id: Schema.Types.ObjectId,
    messageId: {
        type: String,
        required: true,
        default: null,
    },
    userId: {
        type: String,
        required: true,
        default: null,
    },
    notifTitle: {
        type: String,
        required: true,
        default: null,
    },
    notifContent: {
        type: String,
        required: true,
        default: null,
    },
    urgency: { //True = urgent, False = not
        type: Boolean,
        required: true,
        default: false, 
    }
});

export default model("Notification", notifSchema, "notification");

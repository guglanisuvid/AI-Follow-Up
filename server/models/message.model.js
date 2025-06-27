import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mainMessage: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        enum: ["", "Outreach", "Application", "Invitation", "Reminder", "Request", "Proposal", "Follow Up", "Introductory"],
        default: "",
    },
    messageTone: {
        type: String,
        enum: ["", "Formal", "Friendly", "Polite", "Direct", "Casual", "Persuasive", "Appreciative", "Neutral"],
        default: "",
    },
    followUp: {
        subject: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        tone: {
            type: String,
            enum: ["", "Formal", "Friendly", "Polite", "Direct", "Casual", "Persuasive", "Appreciative", "Neutral"],
            default: "",
        },
        scheduledAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ["pending", "sent", "aborted"],
            default: "pending",
        },
    },
    status: {
        type: String,
        enum: ["pending", "processing", "aborted", "completed"],
        default: "pending",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
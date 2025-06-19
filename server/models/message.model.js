import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    mainMessage: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        enum: ["Outreach", "Application", "Invitation", "Reminder", "Request", "Proposal", "Follow Up", "Introductory"]
    },
    messageTone: {
        type: String,
        enum: ["Formal", "Friendly", "Polite", "Direct", "Casual", "Persuasive", "Appreciative", "Neutral"]
    },
    followUp: {
        subject: {
            type: String,
        },
        message: {
            type: String,
        },
        tone: {
            type: String,
        },
        scheduledAt: {
            type: Date,
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
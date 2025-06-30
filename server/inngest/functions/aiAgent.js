import Message from "../../models/message.model.js";
import analyzeMessage from "../../utils/gemini.js";
import getGmailClient from "../../utils/getGmailClient.js";
import { inngest } from "../client.js";

const aiAgent = inngest.createFunction(
    { id: "ai-request" },
    { event: "getting-ai-result" },
    async ({ event, step }) => {
        try {
            const { msg } = event.data;

            await step.run("update-status", async () => {
                return await Message.findByIdAndUpdate(msg._id, { status: "processing" });
            });

            const aiResponse = await analyzeMessage(JSON.parse(msg.mainMessage));

            const aiResult = await step.run("ai-processing", async () => {
                if (aiResponse) {
                    return await Message.findByIdAndUpdate(msg._id,
                        {
                            status: "completed",
                            messageType: aiResponse.messageType,
                            messageTone: aiResponse.messageTone,
                            "followUp.subject": aiResponse.followUpSubject,
                            "followUp.message": aiResponse.followUpBody,
                            "followUp.tone": aiResponse.followUpTone,
                            "followUp.scheduledAt": new Date(Date.now() + 12 * 60 * 60 * 1000)
                        }, { new: true }
                    );
                } else {
                    return await Message.findByIdAndUpdate(msg._id,
                        {
                            status: "aborted",
                        }, { new: true }
                    );
                }
            });

            const draft = await step.run("create-draft", async () => {
                const msg = JSON.parse(aiResult.mainMessage);

                const draftMsg = Buffer.from(
                    `To: ${msg.headers[5].value}\r\n` +
                    `Subject: ${aiResult.followUp.subject}\r\n` +
                    `Content-Type: text/html; charset=UTF-8\r\n\r\n` +
                    `${aiResult.followUp.message}`
                ).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

                const gmail = getGmailClient();
                const draft = await gmail.users.drafts.create({
                    userId: 'me',
                    resource: {
                        message: {
                            raw: draftMsg
                        }
                    }
                });

                return draft.data;
            });

            await step.run("send-follow-up", async () => {
                return await inngest.send({
                    name: "sending-follow-up",
                    data: {
                        draft,
                        time: aiResult.followUp.scheduledAt
                    }
                });
            });

            return true;
        } catch (error) {
            return error;
        }
    });

export default aiAgent;
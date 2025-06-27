import Message from "../../models/message.model.js";
import analyzeMessage from "../../utils/gemini.js";
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
                            "followUp.scheduledAt": new Date(Date.now() + 24 * 60 * 60 * 1000)
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

            await step.run("create and send-draft", async () => {
                console.log(aiResult);
                // const draft = Buffer.from(
                //     `To: ${to}\r\n` +
                //     `Subject: ${subject}\r\n` +
                //     `Content-Type: text/html; charset=UTF-8\r\n\r\n` +
                //     `${message}`
                // ).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

                // await inngest.send({
                //     name: "send-follow-up",
                //     data: {
                //     },
                //     runAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
                // });
            })

            return true;
        } catch (error) {
            return error;
        }
    });

export default aiAgent;
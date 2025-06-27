import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import User from "../../models/user.model.js";
import Message from "../../models/message.model.js";
import getOAuth2Client from "../../utils/getOAuth2Client.js";
import getAuthPayload from "../../utils/getAuthPayload.js";
import getGmailClient from "../../utils/getGmailClient.js";

const messageLabelling = inngest.createFunction(
    { id: "on-message-labelling" },
    { event: "storing-labelled-messages" },
    async ({ event, step }) => {
        try {
            const client = await getOAuth2Client();
            const gmail = getGmailClient();

            const uid = await step.run("get-user", async () => {
                const payload = await getAuthPayload(client, client.credentials.id_token);
                const user = await User.findOne({ googleId: payload.sub });
                if (!user) {
                    return { error: "User not found." }
                }

                return user._id;
            });

            const labelledMessages = await step.run("get-messages", async () => {
                return await Promise.all(
                    event.data.messageIds.map(async (messageId) => {
                        const message = await gmail.users.messages.get({ userId: 'me', id: messageId });
                        if (!message) {
                            throw new NonRetriableError("Message not found.");
                        }

                        return {
                            id: message.data.id,
                            snippet: message.data.snippet,
                            labels: message.data.labelIds,
                            headers: message.data.payload.headers,
                            date: message.data.internalDate
                        };
                    }));
            });

            await step.run("storing-messages-in-db", async () => {
                labelledMessages.forEach(async (message) => {
                    const msg = await Message.create({
                        uid,
                        mainMessage: JSON.stringify(message),
                    });
                    await inngest.send({
                        name: "getting-ai-result",
                        data: {
                            msg
                        }
                    });

                    return msg;
                });
            });
        } catch (error) {
            return error;
        }
    },
);

export default messageLabelling;
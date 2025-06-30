import getGmailClient from "../../utils/getGmailClient.js";
import { inngest } from "../client.js";
import getOrCreateLabel from "../../utils/getOrCreateLabel.js";

const sendFollowUp = inngest.createFunction(
    { id: "send-follow-up" },
    { event: "sending-follow-up" },
    async ({ event, step }) => {
        try {
            await step.sleepUntil("waiting-for-schedulted-time", event.data.time);
            const message = await step.run("send-msg", async () => {
                const { draft } = event.data;
                const gmail = getGmailClient();
                const msg = await gmail.users.drafts.send({
                    userId: 'me',
                    requestBody: {
                        id: draft.id
                    }
                });

                return msg.data;
            });

            await step.run("add-label", async () => {
                const gmail = getGmailClient();
                const label = await getOrCreateLabel(gmail, 'AI Follow-Up Sent');
                return await gmail.users.messages.modify({
                    userId: 'me',
                    id: message.id,
                    requestBody: {
                        addLabelIds: [label.label.id]
                    }
                });
            });

            return true;
        } catch (error) {
            return error;
        }
    }
);

export default sendFollowUp;
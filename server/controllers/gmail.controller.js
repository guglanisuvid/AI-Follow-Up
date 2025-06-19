import getGmailClient from "../utils/getGmailClient.js";
import getOrCreateLabel from "../utils/getOrCreateLabel.js";

const gmail = {
    getSentMessages: async (req, res) => {
        try {
            const gmailClient = getGmailClient();

            const sentMessageList = await gmailClient.users.messages.list({
                userId: 'me',
                maxResults: 20,
                labelIds: ['SENT']
            });

            if (!sentMessageList.data.messages) {
                return res.status(404).json({ error: 'No messages found' });
            }

            let messages = await Promise.all(sentMessageList.data.messages.map(async (message) => {
                const res = await gmailClient.users.messages.get({
                    userId: 'me',
                    id: message.id,
                    format: 'full'
                });

                return {
                    id: res.data.id,
                    snippet: res.data.snippet,
                    labels: res.data.labelIds,
                    headers: res.data.payload.headers,
                    date: res.data.internalDate
                };
            }));

            const label = await getOrCreateLabel(gmailClient);

            const filteredMessages = messages.filter((message) => !message.labels.includes(label.label.id));

            return res.status(200).json({ messages: filteredMessages });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
    getLabelledMessages: async (req, res) => {
        try {
            const gmailClient = getGmailClient();

            const label = await getOrCreateLabel(gmailClient);

            console.log(label);
            const labelledMessageList = await gmailClient.users.messages.list({
                userId: 'me',
                maxResults: 20,
                labelIds: [label.label.id]
            });

            if (!labelledMessageList.data.messages) {
                return res.status(404).json({ error: 'No messages found' });
            }

            let messages = await Promise.all(labelledMessageList.data.messages.map(async (message) => {
                const res = await gmailClient.users.messages.get({
                    userId: 'me',
                    id: message.id,
                    format: 'full'
                });

                return {
                    id: res.data.id,
                    snippet: res.data.snippet,
                    labels: res.data.labelIds,
                    headers: res.data.payload.headers,
                    date: res.data.internalDate
                };
            }));

            return res.status(200).json({ messages });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    addLabelToMessages: async (req, res) => {
        try {
            const gmailClient = getGmailClient();

            const label = await getOrCreateLabel(gmailClient);

            const labelledMessages = await gmailClient.users.messages.batchModify({
                userId: 'me',
                requestBody: {
                    ids: req.body.messageIds,
                    addLabelIds: [label.label.id]
                }
            });

            return res.status(200).json({ data: labelledMessages.data });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
};

export default gmail;
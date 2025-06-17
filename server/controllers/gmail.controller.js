import getGmailClient from "../utils/getGmailClient.js";

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
                    headers: res.data.payload.headers,
                    date: res.data.internalDate
                };
            }));

            return res.status(200).json({ messages });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
};

export default gmail;
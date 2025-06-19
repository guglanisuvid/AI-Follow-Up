const getOrCreateLabel = async (gmailClient) => {
    try {
        let label;

        const labelsList = await gmailClient.users.labels.list({ userId: 'me' });
        const requiredLabel = labelsList.data.labels.find((label) => label.name === 'AI Follow-Up');
        if (requiredLabel) {
            label = await gmailClient.users.labels.get({ userId: 'me', id: requiredLabel.id });
        } else {
            label = await gmailClient.users.labels.create({
                userId: 'me',
                requestBody: {
                    name: 'AI Follow-Up',
                    messageListVisibility: 'show',
                    labelListVisibility: 'labelShow',
                    type: 'user'
                }
            });
        }

        return { label: label.data };
    } catch (error) {
        return { error };
    }
};

export default getOrCreateLabel;
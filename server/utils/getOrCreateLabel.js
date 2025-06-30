const getOrCreateLabel = async (gmailClient, lbl) => {
    try {
        let label;

        const labelsList = await gmailClient.users.labels.list({ userId: 'me' });
        const requiredLabel = labelsList.data.labels.find((label) => label.name === lbl);
        if (requiredLabel) {
            label = await gmailClient.users.labels.get({ userId: 'me', id: requiredLabel.id });
        } else {
            label = await gmailClient.users.labels.create({
                userId: 'me',
                requestBody: {
                    name: lbl,
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
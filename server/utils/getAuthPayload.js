const getAuthPayload = async (client, idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
        return res.status(400).json({ error: 'Failed to verify ID token.' });
    }

    return payload;
}

export default getAuthPayload;
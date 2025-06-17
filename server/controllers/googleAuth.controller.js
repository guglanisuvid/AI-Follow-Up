import User from '../models/user.model.js';
import generateJWTtoken from '../utils/generateJWTtoken.js';
import getOAuth2Client from '../utils/getOAuth2Client.js';
import getAuthPayload from '../utils/getAuthPayload.js';
import { get } from 'mongoose';

const googleAuth = {
    getAuthUrl: async (req, res) => {
        try {
            const scopes = [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://mail.google.com/',
                'https://www.googleapis.com/auth/gmail.labels',
                'https://www.googleapis.com/auth/gmail.send',
                'https://www.googleapis.com/auth/gmail.modify',
                'https://www.googleapis.com/auth/gmail.compose',
                'https://www.googleapis.com/auth/gmail.readonly',
                'https://www.googleapis.com/auth/gmail.insert',
                'https://www.googleapis.com/auth/gmail.settings.basic',
            ];

            const client = getOAuth2Client();

            const url = client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                include_granted_scopes: true,
            });

            return res.status(200).json({ url });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    handleGoogleCallback: async (req, res) => {
        try {
            const { code } = req.body;
            if (!code) {
                return res.status(400).json({ error: 'Failed to retrieve authorization code.' });
            }

            const client = getOAuth2Client();
            const { tokens } = await client.getToken(code)

            if (!tokens) {
                return res.status(400).json({ error: 'Failed to retrieve tokens.' });
            }

            client.setCredentials(tokens);

            const payload = await getAuthPayload(client, tokens.id_token);

            const { name, email, picture, sub: googleId } = payload;

            let user = await User.findOne({ googleId });
            if (!user) {
                user = await User.findOne({ email });
            }

            if (!user) {
                user = await User.create({
                    name,
                    email,
                    googleId,
                    picture,
                    tokens: {
                        access_token: tokens?.access_token,
                        refresh_token: tokens?.refresh_token,
                        token_type: tokens?.token_type,
                        id_token: tokens?.id_token,
                    }
                });
            }

            const jwtToken = generateJWTtoken(user._id);

            return res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                },
                jwt_token: jwtToken
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

export default googleAuth;
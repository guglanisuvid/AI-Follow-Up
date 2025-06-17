import { google } from "googleapis";
import User from "../models/user.model.js";
import getAuthPayload from "./getAuthPayload.js";

let oauth2Client = null;

const getOAuth2Client = () => {
    try {
        if (!oauth2Client) {
            oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                process.env.GOOGLE_REDIRECT_URI
            );

            oauth2Client.on('tokens', async (tokens) => {
                const payload = await getAuthPayload(oauth2Client, tokens.id_token);

                const user = await User.findOne({ googleId: payload.sub });
                if (!user) {
                    return { error: "User not found." }
                }

                if (tokens) {
                    if (tokens.access_token) {
                        await User.updateOne(
                            { _id: user._id },
                            {
                                $set: {
                                    'tokens.access_token': tokens.access_token
                                }
                            }
                        );
                    }
                    if (tokens.refresh_token) {
                        await User.updateOne(
                            { _id: user._id },
                            {
                                $set: {
                                    'tokens.refresh_token': tokens.refresh_token
                                }
                            }
                        );
                    }
                    if (tokens.token_type) {
                        await User.updateOne(
                            { _id: user._id },
                            {
                                $set: {
                                    'tokens.token_type': tokens.token_type
                                }
                            }
                        );
                    }
                    if (tokens.id_token) {
                        await User.updateOne(
                            { _id: user._id },
                            {
                                $set: {
                                    'tokens.id_token': tokens.id_token
                                }
                            }
                        );
                    }
                }
            });
        }

        return oauth2Client;
    } catch (error) {
        throw new Error("Failed to create OAuth2 client", error);
    }
};

export default getOAuth2Client;
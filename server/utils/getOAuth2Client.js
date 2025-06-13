import { google } from "googleapis";
import User from "../models/user.model.js";
import getAuthPayload from "./getAuthPayload.js";

const getOAuth2Client = () => {
    let oauth2Client = null;

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
                    return;
                }

                if (tokens) {
                    await User.updateOne(
                        { _id: user._id },
                        {
                            $set: {
                                tokens: {
                                    access_token: tokens.access_token,
                                    refresh_token: tokens.refresh_token,
                                    id_token: tokens.id_token,
                                    token_type: tokens.token_type
                                }
                            }
                        }
                    );
                }
            });
        }

        return oauth2Client;
    } catch (error) {
        throw new Error("Failed to create OAuth2 client", error);
    }
};

export default getOAuth2Client;
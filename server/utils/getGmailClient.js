import { google } from "googleapis";
import getOAuth2Client from "./getOAuth2Client.js";

let gmailClient = null;

const getGmailClient = () => {
    try {
        if (!gmailClient) {
            gmailClient = google.gmail({ version: 'v1', auth: getOAuth2Client() });
        }

        return gmailClient;
    } catch (error) {
        throw new Error("Failed to create gmail client", error);
    }
}

export default getGmailClient;
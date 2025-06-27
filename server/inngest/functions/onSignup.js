import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import User from "../models/user.model.js";

const welcomeEmail = inngest.createFunction(
    { id: "on-signup" },
    { event: "user/created" },
    async ({ event, step }) => {
        try {
            await step.run("get-user", async () => {
                const user = User.findOne({ email: event.data.email });
                if (!user) {
                    throw new NonRetriableError("User not found");
                }
                return user;
            });
        } catch (error) {
            return error;
        }
    },
);

export default welcomeEmail;
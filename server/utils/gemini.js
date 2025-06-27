import { createAgent, gemini } from "@inngest/agent-kit";
import { runningPrompt, systemPrompt } from "../prompts/gemini.js";

const analyzeMessage = async (message) => {
    try {
        const supportAgent = createAgent({
            model: gemini({
                model: "gemini-1.5-flash-8b",
                apiKey: process.env.GEMINI_API_KEY,
            }),
            name: "AI Follow-Up Support Agent",
            system: systemPrompt
        });

        const response = await supportAgent.run(runningPrompt(message));
        const raw = response.output[0].content;

        try {
            const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
            const jsonString = match ? match[1] : raw.trim();
            return JSON.parse(jsonString);
        } catch (e) {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export default analyzeMessage;

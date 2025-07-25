const { GoogleGenAI } = require("@google/genai");
const { validateStringInput } = require("../ValidateInput");
require('dotenv').config({ path: require('find-config')('.env') })

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

const fetchGeminiResponse = async (prompt) => {
    try {
        validateStringInput(prompt, Object.keys({prompt})[0])
    } catch (error) {
        console.error(error)
        return
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text
    } catch (error) {
        console.error(error)
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });
        return response.text
    } catch (error) {
        console.error(error)
    }
    console.error("Both gemini-2.5-flash & gemini-2.5-flash-lite failed.");
}

module.exports = fetchGeminiResponse
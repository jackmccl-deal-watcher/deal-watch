const { GoogleGenAI } = require("@google/genai");
const { validateStringInput } = require("../ValidateInput");
require('dotenv').config({ path: require('find-config')('.env') })

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

const fetchGeminiResponse = async (prompt) => {
    try {
        validateStringInput(prompt, Object.keys(prompt)[0])
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text
    } catch (error) {
        console.error(error)
    }
}

module.exports = fetchGeminiResponse
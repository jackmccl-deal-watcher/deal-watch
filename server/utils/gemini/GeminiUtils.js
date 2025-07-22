const { GoogleGenAI } = require("@google/genai")
require('dotenv').config({ path: require('find-config')('.env') })

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

const fetchGeminiResponse = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text
}

module.exports = fetchGeminiResponse
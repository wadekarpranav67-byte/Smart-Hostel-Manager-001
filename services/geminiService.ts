import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Analyze a complaint to determine priority and category automatically
export const analyzeComplaint = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this hostel complaint: "${description}". 
      Return a JSON object with two fields: 
      1. 'priority' (High/Medium/Low) based on urgency. 
      2. 'category' (Electrical/Plumbing/Wi-Fi/Furniture/Cleanliness/Other).
      3. 'summary' (A short 5-word summary).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            priority: { type: Type.STRING },
            category: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { priority: 'Medium', category: 'General', summary: 'Analysis Failed' };
  }
};

// Generate a constructive report from mess feedback
export const generateMessReport = async (reviews: string[]) => {
  try {
    const reviewsText = reviews.join("\n");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Here is a list of student feedback for today's mess food:\n${reviewsText}\n
      Summarize the general sentiment, point out specific dishes that were liked or disliked, and provide one constructive suggestion for the kitchen staff. Keep it professional and concise (max 100 words).`
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Report Error:", error);
    return "Could not generate report at this time.";
  }
};
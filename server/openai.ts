import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-development" });

export async function getChatbotResponse(message: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are a helpful academic advisor and wellness counselor at Humber College. " +
            "Provide supportive, informative responses about academic planning, career development, " +
            "and student wellness. Keep responses concise and practical.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content || "I apologize, but I couldn't process your request.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm sorry, but I'm having trouble responding right now. Please try again later.";
  }
}

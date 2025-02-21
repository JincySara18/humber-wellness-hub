import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-development" });

export async function getChatbotResponse(message: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "The AI counselor is not available at the moment. Please try again later or contact support.";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are a helpful academic advisor and wellness counselor at Humber College. " +
            "Provide supportive, informative responses about academic planning, career development, " +
            "and student wellness. Keep responses concise, practical, and empathetic. " +
            "If asked about complex personal issues, encourage seeking professional help through the college's counseling services.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
      timeout: 10000, // 10 second timeout
    });

    return response.choices[0].message.content || 
      "I apologize, but I couldn't generate a response. Please try rephrasing your question.";
  } catch (error: any) {
    console.error("OpenAI API error:", error);

    if (error.code === 'ECONNABORTED') {
      return "I'm experiencing some delays. Please try again in a moment.";
    }

    if (error.response?.status === 429) {
      return "I'm currently handling too many requests. Please try again in a few minutes.";
    }

    if (error.response?.status === 401) {
      return "The AI counselor is temporarily unavailable. Please try again later or contact support.";
    }

    return "I apologize, but I'm having technical difficulties. Please try again later.";
  }
}
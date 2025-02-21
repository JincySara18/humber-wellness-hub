import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || "dummy-key-for-development"
});

export async function getChatbotResponse(message: string): Promise<string> {
  if (!process.env.CLAUDE_API_KEY) {
    return "The AI counselor is not available at the moment. Please try again later or contact support.";
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: 
            "You are a helpful academic advisor and wellness counselor at Humber College. " +
            "Provide supportive, informative responses about academic planning, career development, " +
            "and student wellness. Keep responses concise, practical, and empathetic. " +
            "If asked about complex personal issues, encourage seeking professional help through the college's counseling services."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return response.content[0].text || 
      "I apologize, but I couldn't generate a response. Please try rephrasing your question.";

  } catch (error: any) {
    console.error("Claude API error:", error);

    if (error.status === 429) {
      return "The AI counselor is currently busy. Please try again in a few minutes.";
    }

    if (error.status === 401) {
      return "The AI counselor service is not properly configured. Please contact support.";
    }

    return "I apologize, but I'm having trouble processing your request. You may want to try booking an appointment with one of our counselors instead.";
  }
}

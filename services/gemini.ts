import { GoogleGenAI, Chat } from "@google/genai";

// Create a new Chat Session
export const createChatSession = (apiKey: string): Chat => {
  if (!apiKey) {
    throw new Error("API 키가 없습니다. 좌측 메뉴에서 Gemini API 키를 입력하거나 환경 변수를 설정해주세요.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = "당신은 전문 콘텐츠 크리에이터이자 마케팅 전략가입니다. 당신의 목표는 사용자가 특정 프레임워크와 모듈을 기반으로 고품질 콘텐츠를 생성하도록 돕는 것입니다. 모든 응답은 한국어로 자연스럽게 작성해주세요.";

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    }
  });
};

// Send a message to the existing chat session
export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    // Append instruction for markdown only if it's the first message or if explicitly needed, 
    // but usually system instruction handles personality. 
    // We add a subtle reminder for formatting if needed, but keeping it clean for chat is better.
    
    const response = await chat.sendMessage({
      message: message
    });

    return response.text || "응답이 생성되지 않았습니다.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('403') || error.message?.includes('API key')) {
      throw new Error("API 키가 올바르지 않거나 만료되었습니다. 키를 확인해주세요.");
    }
    throw error;
  }
};
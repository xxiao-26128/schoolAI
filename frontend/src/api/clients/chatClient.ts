import type {
  ChatResponse,
  CreateChatRequestBody,
  SendMessageRequestBody,
  SendMessageResponseBody,
} from "../contracts/chat";
import { mapMessageResponse } from "../mappers/chatMapper";
import { apiPost } from "../client";
import type { ChatMessage } from "../../models/chatMessage";

interface SentMessages {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

// Only the id is needed by the rest of the app today (no chat-list/history
// UI exists yet), so this returns a bare string rather than a full Chat
// model — nothing beyond this client ever sees the raw ChatResponse shape.
export async function createChat(params: {
  classroomId: string | null;
  studentId: string | null;
}): Promise<string> {
  const body: CreateChatRequestBody = {
    classroomId: params.classroomId,
    studentId: params.studentId,
  };
  const chat = await apiPost<ChatResponse>("/api/v1/chats", body);
  return chat.id;
}

export async function sendChatMessage(chatId: string, content: string): Promise<SentMessages> {
  const body: SendMessageRequestBody = { content };
  const response = await apiPost<SendMessageResponseBody>(
    `/api/v1/chats/${chatId}/messages`,
    body,
  );
  return {
    userMessage: mapMessageResponse(response.userMessage),
    assistantMessage: mapMessageResponse(response.assistantMessage),
  };
}

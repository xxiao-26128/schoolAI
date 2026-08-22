// Shapes exactly as the backend sends/expects them over the wire.

export interface ChatResponse {
  id: string;
  classroomId: string | null;
  studentId: string | null;
  title: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatRequestBody {
  classroomId: string | null;
  studentId: string | null;
}

export interface MessageResponse {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface SendMessageRequestBody {
  content: string;
}

export interface SendMessageResponseBody {
  userMessage: MessageResponse;
  assistantMessage: MessageResponse;
}

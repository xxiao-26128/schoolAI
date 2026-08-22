import type { MessageResponse } from "../contracts/chat";
import type { ChatMessage } from "../../models/chatMessage";

export function mapMessageResponse(response: MessageResponse): ChatMessage {
  return {
    id: response.id,
    role: response.role === "assistant" ? "assistant" : "user",
    content: response.content,
  };
}

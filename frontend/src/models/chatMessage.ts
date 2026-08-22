// Matches the backend's role field directly — "user" covers whichever
// human is chatting (teacher today, potentially other user types later),
// kept distinct from UserRole below so the chat-turn discriminator doesn't
// have to change if the set of user types grows.
export type ChatMessageRole = "user" | "assistant";

export type UserRole = "teacher" | "student";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
}

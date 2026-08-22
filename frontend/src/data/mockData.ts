import type { ChatMessage } from "../models/chatMessage";
import type { InsightSection, TimeRange } from "../types";

export const timeRanges: TimeRange[] = ["7D", "1M", "3M", "All", "Custom"];

// Placeholder content shown before a real conversation starts, matching
// the original design mock's chat panel. Cleared as soon as a real chat
// session loads (see App.tsx) — never sent to the backend.
export const mockChatMessages: ChatMessage[] = [
  { id: "mock-1", role: "assistant", content: "Chat Content" },
  { id: "mock-2", role: "user", content: "Chat Content" },
  { id: "mock-3", role: "assistant", content: "Chat Content" },
  { id: "mock-4", role: "user", content: "Chat Content" },
  { id: "mock-5", role: "assistant", content: "Chat Content" },
];

const placeholderBody =
  "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";

export const discussionSections: InsightSection[] = [
  { id: "theme", icon: "theme", title: "Key Discussion Theme", body: placeholderBody },
  { id: "question", icon: "question", title: "Common Questions", body: placeholderBody },
  { id: "interest", icon: "interest", title: "Student Interest", body: placeholderBody },
  { id: "engagement", icon: "engagement", title: "Student Engagement", body: placeholderBody },
];

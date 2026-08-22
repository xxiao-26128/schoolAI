export type TimeRange = "7D" | "1M" | "3M" | "All" | "Custom";

export interface DateRange {
  start: string;
  end: string;
}

export interface ClassroomOption {
  id: string;
  label: string;
}

export interface StudentOption {
  id: string;
  name: string;
  classroomId: string;
}

export interface InsightSection {
  id: string;
  icon: "theme" | "question" | "interest" | "engagement";
  title: string;
  body: string;
}

export type ChatRole = "assistant" | "student";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  speakerName: string;
  content: string;
}

export interface PromptSuggestion {
  id: string;
  label: string;
}

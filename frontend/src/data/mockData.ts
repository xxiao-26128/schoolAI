import type {
  ChatMessage,
  ClassroomOption,
  InsightSection,
  PromptSuggestion,
  StudentOption,
  TimeRange,
} from "../types";

export const EVERYONE_ID = "everyone";

export const classroomOptions: ClassroomOption[] = [
  { id: EVERYONE_ID, label: "Everyone" },
  { id: "class-5a", label: "Class 5A" },
  { id: "class-5b", label: "Class 5B" },
  { id: "class-3b", label: "Class 3B" },
];

export const studentOptions: StudentOption[] = [
  { id: "student-jane-5a", name: "Jane Doe", classroomId: "class-5a" },
  { id: "student-mike-5a", name: "Mike Chen", classroomId: "class-5a" },
  { id: "student-sofia-5b", name: "Sofia Rossi", classroomId: "class-5b" },
  { id: "student-liam-5b", name: "Liam Walker", classroomId: "class-5b" },
  { id: "student-priya-5b", name: "Priya Patel", classroomId: "class-5b" },
  { id: "student-jane-3b", name: "Jane Doe", classroomId: "class-3b" },
  { id: "student-alex-3b", name: "Alex Kim", classroomId: "class-3b" },
];

export const timeRanges: TimeRange[] = ["7D", "1M", "3M", "All", "Custom"];

const placeholderBody =
  "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";

export const discussionSections: InsightSection[] = [
  { id: "theme", icon: "theme", title: "Key Discussion Theme", body: placeholderBody },
  { id: "question", icon: "question", title: "Common Questions", body: placeholderBody },
  { id: "interest", icon: "interest", title: "Student Interest", body: placeholderBody },
  { id: "engagement", icon: "engagement", title: "Student Engagement", body: placeholderBody },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", role: "assistant", speakerName: "Claire AI", content: "Chat Content" },
  { id: "m2", role: "student", speakerName: "Student Name", content: "Chat Content" },
  { id: "m3", role: "assistant", speakerName: "Claire AI", content: "Chat Content" },
  { id: "m4", role: "student", speakerName: "Student Name", content: "Chat Content" },
  { id: "m5", role: "assistant", speakerName: "Claire AI", content: "Chat Content" },
];

export const promptSuggestions: PromptSuggestion[] = [
  { id: "p1", label: "Show me student detail" },
  { id: "p2", label: "Prompt" },
];

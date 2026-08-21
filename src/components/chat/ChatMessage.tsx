import type { ChatMessage as ChatMessageType } from "../../types";
import { CopyIcon, QuoteIcon, SpeakerIcon, TranslateIcon } from "../icons";

export function ChatMessage({ role, speakerName, content }: ChatMessageType) {
  const isStudent = role === "student";

  return (
    <div className={`flex flex-col gap-1.5 ${isStudent ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        {!isStudent && (
          <>
            Claire<span className="text-[10px] font-bold text-violet-600 align-super">AI</span>
          </>
        )}
        <span className="flex items-center gap-2 text-gray-400">
          <CopyIcon />
          <SpeakerIcon />
          <TranslateIcon />
          <QuoteIcon />
        </span>
        {isStudent && <span>{speakerName}</span>}
      </div>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
          isStudent
            ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
            : "border border-gray-200 bg-white text-gray-700"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

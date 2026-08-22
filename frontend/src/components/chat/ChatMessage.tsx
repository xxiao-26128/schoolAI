import type { ChatMessage as ChatMessageType } from "../../models/chatMessage";
import { CopyIcon, QuoteIcon, SpeakerIcon, TranslateIcon } from "../icons";

export function ChatMessage({ role, content }: ChatMessageType) {
  const isUser = role === "user";

  return (
    <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        {!isUser && (
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
        {isUser && <span>You</span>}
      </div>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
          isUser
            ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
            : "border border-gray-200 bg-white text-gray-700"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

import type { ChatMessage as ChatMessageType, PromptSuggestion } from "../../types";
import { ChatInputBar } from "./ChatInputBar";
import { ChatMessage } from "./ChatMessage";
import { PromptSuggestions } from "./PromptSuggestions";

interface ChatPanelProps {
  messages: ChatMessageType[];
  suggestions: PromptSuggestion[];
}

export function ChatPanel({ messages, suggestions }: ChatPanelProps) {
  return (
    <aside className="flex h-full w-[420px] shrink-0 flex-col border-l border-gray-200 px-5 py-5">
      <h1 className="mb-4 text-lg font-semibold text-gray-900">
        Claire<span className="text-xs font-bold text-violet-600 align-super">AI</span>
      </h1>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <PromptSuggestions suggestions={suggestions} />
        <ChatInputBar />
      </div>
    </aside>
  );
}

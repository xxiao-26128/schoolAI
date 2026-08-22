import type { ChatMessage as ChatMessageType } from "../../models/chatMessage";
import type { PromptSuggestion } from "../../models/promptSuggestion";
import type { FetchStatus } from "../../types";
import { ChatInputBar } from "./ChatInputBar";
import { ChatMessage } from "./ChatMessage";
import { PromptSuggestions } from "./PromptSuggestions";

interface ChatPanelProps {
  chatStatus: FetchStatus;
  onRetryChat: () => void;
  messages: ChatMessageType[];
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
  isSendingMessage: boolean;
  sendError: boolean;
  onNewChat: () => void;
  suggestions: PromptSuggestion[];
  suggestionsStatus: FetchStatus;
  onRetrySuggestions: () => void;
}

export function ChatPanel({
  chatStatus,
  onRetryChat,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  isSendingMessage,
  sendError,
  onNewChat,
  suggestions,
  suggestionsStatus,
  onRetrySuggestions,
}: ChatPanelProps) {
  return (
    <aside className="flex h-full w-[420px] shrink-0 flex-col border-l border-gray-200 px-5 py-5">
      <h1 className="mb-4 text-lg font-semibold text-gray-900">
        Claire<span className="text-xs font-bold text-violet-600 align-super">AI</span>
      </h1>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}

        {messages.length === 0 && chatStatus === "loading" && (
          <p className="text-sm text-gray-400">Starting chat…</p>
        )}

        {messages.length === 0 && chatStatus === "error" && (
          <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-500">
            Couldn't start a chat.
            <button
              type="button"
              onClick={onRetryChat}
              className="font-medium text-violet-700 hover:text-violet-800"
            >
              Retry
            </button>
          </div>
        )}

        {messages.length === 0 && chatStatus === "ready" && (
          <p className="text-sm text-gray-400">Ask Claire AI a question to get started.</p>
        )}

        {isSendingMessage && <p className="text-sm text-gray-400">Claire AI is replying…</p>}

        {sendError && (
          <p className="text-sm text-red-600">Couldn't send that message. Try again.</p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <PromptSuggestions
          suggestions={suggestions}
          status={suggestionsStatus}
          onRetry={onRetrySuggestions}
        />
        <ChatInputBar
          value={messageInput}
          onChange={onMessageInputChange}
          onSend={onSendMessage}
          isSending={isSendingMessage || chatStatus !== "ready"}
          onNewChat={onNewChat}
        />
      </div>
    </aside>
  );
}

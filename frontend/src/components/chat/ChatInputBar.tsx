import type { FormEvent } from "react";
import { AttachIcon, DownloadIcon, HistoryIcon, MicIcon, PlusIcon, ScissorsIcon } from "../icons";

interface ChatInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isSending: boolean;
  onNewChat: () => void;
}

export function ChatInputBar({ value, onChange, onSend, isSending, onNewChat }: ChatInputBarProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isSending || value.trim() === "") return;
    onSend();
  }

  return (
    <div className="flex flex-col gap-2 border-t border-gray-200 pt-3">
      <div className="flex items-center justify-between text-gray-400">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Attach file" className="hover:text-gray-600">
            <AttachIcon />
          </button>
          <button type="button" aria-label="Cut" className="hover:text-gray-600">
            <ScissorsIcon />
          </button>
          <button type="button" aria-label="Download" className="hover:text-gray-600">
            <DownloadIcon />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="New chat"
            onClick={onNewChat}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700"
          >
            <PlusIcon width={14} height={14} />
          </button>
          <button type="button" aria-label="History" className="hover:text-gray-600" disabled>
            <HistoryIcon />
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2.5"
      >
        <MicIcon className="text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={isSending}
          placeholder="Press enter to continue..."
          className="w-full text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
}

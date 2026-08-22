import { AttachIcon, DownloadIcon, HistoryIcon, MicIcon, PlusIcon, ScissorsIcon } from "../icons";

export function ChatInputBar() {
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
            className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700"
          >
            <PlusIcon width={14} height={14} />
          </button>
          <button type="button" aria-label="History" className="hover:text-gray-600">
            <HistoryIcon />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2.5">
        <MicIcon className="text-gray-400" />
        <input
          type="text"
          placeholder="Press enter to continue..."
          className="w-full text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

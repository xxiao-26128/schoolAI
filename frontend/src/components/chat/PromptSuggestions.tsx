import type { PromptSuggestion } from "../../models/promptSuggestion";
import type { FetchStatus } from "../../types";
import { ChevronDownIcon } from "../icons";

interface PromptSuggestionsProps {
  suggestions: PromptSuggestion[];
  status: FetchStatus;
  onRetry: () => void;
}

export function PromptSuggestions({ suggestions, status, onRetry }: PromptSuggestionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2.5 text-left text-sm text-gray-500"
      >
        A list of Prompt
        <ChevronDownIcon />
      </button>

      {status === "loading" && (
        <p className="px-1 text-sm text-gray-400">Loading suggestions…</p>
      )}

      {status === "error" && (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-500">
          Couldn't load prompt suggestions.
          <button
            type="button"
            onClick={onRetry}
            className="font-medium text-violet-700 hover:text-violet-800"
          >
            Retry
          </button>
        </div>
      )}

      {status === "ready" && suggestions.length === 0 && (
        <p className="px-1 text-sm text-gray-400">No prompt suggestions yet.</p>
      )}

      {status === "ready" &&
        suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            type="button"
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {suggestion.displayTitle}
          </button>
        ))}
    </div>
  );
}

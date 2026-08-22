import type { PromptSuggestion } from "../../types";
import { ChevronDownIcon } from "../icons";

interface PromptSuggestionsProps {
  suggestions: PromptSuggestion[];
}

export function PromptSuggestions({ suggestions }: PromptSuggestionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2.5 text-left text-sm text-gray-500"
      >
        A list of Prompt
        <ChevronDownIcon />
      </button>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}

import type { PromptResponse } from "../contracts/prompt";
import type { PromptSuggestion } from "../../models/promptSuggestion";

export function mapPromptResponse(response: PromptResponse): PromptSuggestion {
  return {
    id: response.id,
    displayTitle: response.title,
  };
}

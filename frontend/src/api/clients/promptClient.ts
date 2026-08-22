import type { PromptListResponse } from "../contracts/prompt";
import { mapPromptResponse } from "../mappers/promptMapper";
import { apiGet } from "../client";
import type { PromptSuggestion } from "../../models/promptSuggestion";

export async function fetchPromptSuggestions(): Promise<PromptSuggestion[]> {
  const { items } = await apiGet<PromptListResponse>("/api/v1/prompts");
  return items.map(mapPromptResponse);
}

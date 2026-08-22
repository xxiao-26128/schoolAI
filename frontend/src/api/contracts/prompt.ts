// Shape exactly as the backend sends it over the wire (GET /api/v1/prompts).
// Nothing outside api/clients and api/mappers should import this directly —
// the rest of the app depends on the mapped model in src/models instead.

export interface PromptResponse {
  id: string;
  title: string;
}

export interface PromptListResponse {
  items: PromptResponse[];
}

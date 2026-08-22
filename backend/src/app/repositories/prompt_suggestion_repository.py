from app.schemas.prompt import Prompt

# Mirrors frontend/src/data/mockData.ts.
_PROMPT_SUGGESTIONS: list[Prompt] = [
    Prompt(id="p1", title="Show me student detail"),
    Prompt(id="p2", title="Prompt"),
]


class PromptSuggestionRepository:
    """Data access for prebuilt chat prompt suggestions.

    Backed by in-memory mock data for now; once app/db/ has real
    persistence, swap the body below for an actual query without
    changing any caller.
    """

    def list_prompt_suggestions(self) -> list[Prompt]:
        return list(_PROMPT_SUGGESTIONS)

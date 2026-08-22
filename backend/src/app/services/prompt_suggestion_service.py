from app.repositories.prompt_suggestion_repository import PromptSuggestionRepository
from app.schemas.prompt import PromptList


class PromptSuggestionService:
    def __init__(self, repository: PromptSuggestionRepository | None = None) -> None:
        self._repository = repository or PromptSuggestionRepository()

    def list_prompt_suggestions(self) -> PromptList:
        return PromptList(
            items=self._repository.list_prompt_suggestions()
        )

from fastapi import APIRouter, Depends

from app.schemas.prompt import PromptList
from app.services.prompt_suggestion_service import PromptSuggestionService

router = APIRouter()


def get_prompt_suggestion_service() -> PromptSuggestionService:
    return PromptSuggestionService()


@router.get("/api/v1/prompts", response_model=PromptList)
def list_prompt_suggestions(
    service: PromptSuggestionService = Depends(get_prompt_suggestion_service),
) -> PromptList:
    return service.list_prompt_suggestions()

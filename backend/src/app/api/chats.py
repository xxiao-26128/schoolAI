from fastapi import APIRouter, Depends, HTTPException

from app.schemas.chat import Chat, ChatCreateRequest, SendMessageRequest, SendMessageResponse
from app.services.chat_service import (
    ChatNotFoundError,
    ChatService,
    ClassroomNotFoundError,
    StudentNotFoundError,
    StudentRequiresClassroomError,
)

router = APIRouter()


def get_chat_service() -> ChatService:
    return ChatService()


@router.post(
    "/api/v1/chats",
    response_model=Chat,
    response_model_by_alias=True,
    status_code=201,
)
def create_chat(
    body: ChatCreateRequest,
    service: ChatService = Depends(get_chat_service),
) -> Chat:
    try:
        return service.create_chat(
            classroom_id=body.classroom_id, student_id=body.student_id
        )
    except ClassroomNotFoundError as exc:
        raise HTTPException(status_code=404, detail="Classroom not found") from exc
    except StudentNotFoundError as exc:
        raise HTTPException(
            status_code=404, detail="Student not found in classroom"
        ) from exc
    except StudentRequiresClassroomError as exc:
        raise HTTPException(
            status_code=400, detail="studentId requires classroomId"
        ) from exc


@router.post(
    "/api/v1/chats/{chat_id}/messages",
    response_model=SendMessageResponse,
    response_model_by_alias=True,
    status_code=201,
)
def send_message(
    chat_id: str,
    body: SendMessageRequest,
    service: ChatService = Depends(get_chat_service),
) -> SendMessageResponse:
    try:
        user_message, assistant_message = service.send_message(
            chat_id=chat_id, content=body.content
        )
    except ChatNotFoundError as exc:
        raise HTTPException(status_code=404, detail="Chat not found") from exc

    return SendMessageResponse(
        userMessage=user_message, assistantMessage=assistant_message
    )

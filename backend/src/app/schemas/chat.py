from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class ChatCreateRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    classroom_id: str | None = Field(default=None, alias="classroomId")
    student_id: str | None = Field(default=None, alias="studentId")


class Chat(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    classroom_id: str | None = Field(alias="classroomId", serialization_alias="classroomId")
    student_id: str | None = Field(alias="studentId", serialization_alias="studentId")
    title: str | None = None
    created_at: datetime = Field(alias="createdAt", serialization_alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt", serialization_alias="updatedAt")


class SendMessageRequest(BaseModel):
    content: str = Field(min_length=1)


class Message(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    chat_id: str = Field(alias="chatId", serialization_alias="chatId")
    role: Literal["user", "assistant"]
    content: str
    created_at: datetime = Field(alias="createdAt", serialization_alias="createdAt")


class SendMessageResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    user_message: Message = Field(alias="userMessage", serialization_alias="userMessage")
    assistant_message: Message = Field(
        alias="assistantMessage", serialization_alias="assistantMessage"
    )

from datetime import datetime

from app.schemas.chat import Chat

# In-memory store for now; once app/db/ has real persistence, swap the bodies
# below for actual inserts/queries without changing any caller. Unlike the
# static classroom/student mock data, this one is written to at runtime.
_CHATS: list[Chat] = []


class ChatRepository:
    """Data access for chats."""

    def add(self, chat: Chat) -> Chat:
        _CHATS.append(chat)
        return chat

    def get(self, chat_id: str) -> Chat | None:
        return next((chat for chat in _CHATS if chat.id == chat_id), None)

    def touch(self, chat_id: str, updated_at: datetime) -> Chat | None:
        chat = self.get(chat_id)
        if chat is None:
            return None
        updated = chat.model_copy(update={"updated_at": updated_at})
        _CHATS[_CHATS.index(chat)] = updated
        return updated

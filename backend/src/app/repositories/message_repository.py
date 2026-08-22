from app.schemas.chat import Message

# In-memory store for now; once app/db/ has real persistence, swap the bodies
# below for actual inserts/queries without changing any caller.
_MESSAGES: list[Message] = []


class MessageRepository:
    """Data access for chat messages."""

    def add(self, message: Message) -> Message:
        _MESSAGES.append(message)
        return message

    def list_by_chat(self, chat_id: str) -> list[Message]:
        return [message for message in _MESSAGES if message.chat_id == chat_id]

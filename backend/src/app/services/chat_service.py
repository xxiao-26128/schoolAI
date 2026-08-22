import uuid
from datetime import datetime, timezone

from app.repositories.chat_repository import ChatRepository
from app.repositories.classroom_repository import ClassroomRepository
from app.repositories.message_repository import MessageRepository
from app.repositories.student_repository import StudentRepository
from app.schemas.chat import Chat, Message
from app.services.chat_agent_service import ChatAgentService


class ClassroomNotFoundError(Exception):
    """classroom_id doesn't match any known classroom."""


class StudentNotFoundError(Exception):
    """student_id doesn't match any known student in the given classroom."""


class StudentRequiresClassroomError(Exception):
    """student_id was given without classroom_id."""


class ChatNotFoundError(Exception):
    """chat_id doesn't match any existing chat."""


class ChatService:
    def __init__(
        self,
        chat_repository: ChatRepository | None = None,
        classroom_repository: ClassroomRepository | None = None,
        student_repository: StudentRepository | None = None,
        message_repository: MessageRepository | None = None,
        chat_agent_service: ChatAgentService | None = None,
    ) -> None:
        self._chats = chat_repository or ChatRepository()
        self._classrooms = classroom_repository or ClassroomRepository()
        self._students = student_repository or StudentRepository()
        self._messages = message_repository or MessageRepository()
        self._agent = chat_agent_service or ChatAgentService()

    def create_chat(self, classroom_id: str | None, student_id: str | None) -> Chat:
        if student_id is not None and classroom_id is None:
            raise StudentRequiresClassroomError(student_id)

        if classroom_id is not None and not self._classrooms.exists(classroom_id):
            raise ClassroomNotFoundError(classroom_id)

        if student_id is not None:
            student = next(
                (s for s in self._students.list_students() if s.id == student_id),
                None,
            )
            if student is None or student.classroom_id != classroom_id:
                raise StudentNotFoundError(student_id)

        now = datetime.now(timezone.utc)
        chat = Chat(
            id=str(uuid.uuid4()),
            classroomId=classroom_id,
            studentId=student_id,
            title=None,
            createdAt=now,
            updatedAt=now,
        )
        return self._chats.add(chat)

    def send_message(self, chat_id: str, content: str) -> tuple[Message, Message]:
        if self._chats.get(chat_id) is None:
            raise ChatNotFoundError(chat_id)

        user_message = self._messages.add(
            Message(
                id=str(uuid.uuid4()),
                chatId=chat_id,
                role="user",
                content=content,
                createdAt=datetime.now(timezone.utc),
            )
        )

        reply_content = self._agent.generate_reply(content)

        now = datetime.now(timezone.utc)
        assistant_message = self._messages.add(
            Message(
                id=str(uuid.uuid4()),
                chatId=chat_id,
                role="assistant",
                content=reply_content,
                createdAt=now,
            )
        )
        self._chats.touch(chat_id, now)

        return user_message, assistant_message

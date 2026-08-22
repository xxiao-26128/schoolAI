import base64
import json

from app.repositories.classroom_repository import ClassroomRepository
from app.repositories.student_repository import StudentRepository
from app.schemas.student import Student, StudentList


class ClassroomNotFoundError(Exception):
    """Raised when a classroom_id filter doesn't match any known classroom."""


class InvalidCursorError(Exception):
    """Raised when a cursor can't be decoded back into a sort position."""


def _encode_cursor(student: Student) -> str:
    payload = json.dumps({"name": student.name, "id": student.id}).encode("utf-8")
    return base64.urlsafe_b64encode(payload).decode("ascii")


def _decode_cursor(cursor: str) -> tuple[str, str]:
    try:
        payload = json.loads(base64.urlsafe_b64decode(cursor.encode("ascii")))
        return payload["name"], payload["id"]
    except Exception as exc:
        raise InvalidCursorError(cursor) from exc


class StudentService:
    """Business logic for listing students: classroom scoping, name search,
    and cursor-based pagination.

    Students are sorted by (name, id) — name because that's how a teacher
    scans a roster, id as a tiebreaker so same-named students in different
    classrooms (e.g. two "Jane Doe"s) still get a stable, deterministic
    order for the cursor to walk through.
    """

    def __init__(
        self,
        student_repository: StudentRepository | None = None,
        classroom_repository: ClassroomRepository | None = None,
    ) -> None:
        self._students = student_repository or StudentRepository()
        self._classrooms = classroom_repository or ClassroomRepository()

    def list_students(
        self,
        classroom_id: str | None,
        search: str | None,
        cursor: str | None,
        limit: int,
    ) -> StudentList:
        if classroom_id is not None and not self._classrooms.exists(classroom_id):
            raise ClassroomNotFoundError(classroom_id)

        students = self._students.list_students()

        if classroom_id is not None:
            students = [s for s in students if s.classroom_id == classroom_id]

        if search:
            needle = search.lower()
            students = [s for s in students if needle in s.name.lower()]

        students.sort(key=lambda s: (s.name, s.id))

        if cursor is not None:
            after_name, after_id = _decode_cursor(cursor)
            students = [s for s in students if (s.name, s.id) > (after_name, after_id)]

        page = students[:limit]
        has_more = len(students) > limit
        next_cursor = _encode_cursor(page[-1]) if has_more and page else None

        return StudentList(items=page, next_cursor=next_cursor, has_more=has_more)

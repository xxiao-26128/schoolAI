from datetime import date

from app.repositories.classroom_repository import ClassroomRepository
from app.repositories.discussion_summary_repository import DiscussionSummaryRepository
from app.repositories.student_repository import StudentRepository
from app.schemas.discussion_summary import DiscussionSummaryResponse

VALID_TIME_RANGES = {"7D", "1M", "3M", "All", "Custom"}


class ClassroomNotFoundError(Exception):
    """classroom_id doesn't match any known classroom."""


class StudentNotFoundError(Exception):
    """student_id doesn't match any known student in the given classroom."""


class StudentRequiresClassroomError(Exception):
    """student_id was given without classroom_id."""


class InvalidTimeRangeError(Exception):
    """time isn't one of the supported values."""


class CustomRangeRequiresDatesError(Exception):
    """time=Custom requires both start and end."""


class DiscussionSummaryService:
    def __init__(
        self,
        summary_repository: DiscussionSummaryRepository | None = None,
        classroom_repository: ClassroomRepository | None = None,
        student_repository: StudentRepository | None = None,
    ) -> None:
        self._summaries = summary_repository or DiscussionSummaryRepository()
        self._classrooms = classroom_repository or ClassroomRepository()
        self._students = student_repository or StudentRepository()

    def get_summary(
        self,
        classroom_id: str | None,
        student_id: str | None,
        time: str,
        start: date | None,
        end: date | None,
    ) -> DiscussionSummaryResponse:
        if time not in VALID_TIME_RANGES:
            raise InvalidTimeRangeError(time)

        if time == "Custom" and (start is None or end is None):
            raise CustomRangeRequiresDatesError(time)

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

        return self._summaries.get_summary(classroom_id, student_id, time, start, end)

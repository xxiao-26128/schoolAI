from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query

from app.schemas.discussion_summary import DiscussionSummaryResponse
from app.services.discussion_summary_service import (
    ClassroomNotFoundError,
    CustomRangeRequiresDatesError,
    DiscussionSummaryService,
    InvalidTimeRangeError,
    StudentNotFoundError,
    StudentRequiresClassroomError,
)

router = APIRouter()


def get_discussion_summary_service() -> DiscussionSummaryService:
    return DiscussionSummaryService()


@router.get(
    "/api/v1/discussion-summary",
    response_model=DiscussionSummaryResponse,
    response_model_by_alias=True,
)
def get_discussion_summary(
    classroom_id: str | None = Query(default=None),
    student_id: str | None = Query(default=None),
    time: str = Query(default="All"),
    start: date | None = Query(default=None),
    end: date | None = Query(default=None),
    service: DiscussionSummaryService = Depends(get_discussion_summary_service),
) -> DiscussionSummaryResponse:
    try:
        return service.get_summary(
            classroom_id=classroom_id,
            student_id=student_id,
            time=time,
            start=start,
            end=end,
        )
    except InvalidTimeRangeError as exc:
        raise HTTPException(status_code=400, detail="Invalid time range") from exc
    except CustomRangeRequiresDatesError as exc:
        raise HTTPException(
            status_code=400, detail="time=Custom requires start and end"
        ) from exc
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

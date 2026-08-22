from fastapi import APIRouter, Depends, HTTPException, Query

from app.schemas.student import StudentList
from app.services.student_service import (
    ClassroomNotFoundError,
    InvalidCursorError,
    StudentService,
)

router = APIRouter()


def get_student_service() -> StudentService:
    return StudentService()


@router.get(
    "/api/v1/students",
    response_model=StudentList,
    response_model_by_alias=True,
)
def list_students(
    classroom_id: str | None = Query(default=None),
    search: str | None = Query(default=None),
    cursor: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    service: StudentService = Depends(get_student_service),
) -> StudentList:
    try:
        return service.list_students(
            classroom_id=classroom_id, search=search, cursor=cursor, limit=limit
        )
    except ClassroomNotFoundError as exc:
        raise HTTPException(status_code=404, detail="Classroom not found") from exc
    except InvalidCursorError as exc:
        raise HTTPException(status_code=400, detail="Invalid cursor") from exc

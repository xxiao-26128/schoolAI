from fastapi import APIRouter, Depends

from app.schemas.classroom import ClassroomList
from app.services.classroom_service import ClassroomService

router = APIRouter()


def get_classroom_service() -> ClassroomService:
    return ClassroomService()


@router.get("/api/v1/classrooms", response_model=ClassroomList)
def list_classrooms(
    service: ClassroomService = Depends(get_classroom_service),
) -> ClassroomList:
    return service.list_classrooms()

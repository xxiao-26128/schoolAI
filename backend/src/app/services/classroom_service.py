from app.repositories.classroom_repository import ClassroomRepository
from app.schemas.classroom import ClassroomList


class ClassroomService:
    def __init__(self, repository: ClassroomRepository | None = None) -> None:
        self._repository = repository or ClassroomRepository()

    def list_classrooms(self) -> ClassroomList:
        return ClassroomList(items=self._repository.list_classrooms())

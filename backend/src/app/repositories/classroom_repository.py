from app.schemas.classroom import ClassRoom

# Mirrors frontend/src/data/mockData.ts. "Everyone" is a frontend-only
# sentinel (see EVERYONE_ID in mockData.ts) and is intentionally not a real
# classroom here.
_CLASSROOMS: list[ClassRoom] = [
    ClassRoom(id="class-5a", name="Class 5A"),
    ClassRoom(id="class-5b", name="Class 5B"),
    ClassRoom(id="class-3b", name="Class 3B"),
]


class ClassroomRepository:
    """Data access for classrooms.

    Backed by in-memory mock data for now; once app/db/ has real
    persistence, swap the bodies below for actual queries without
    changing any caller.
    """

    def list_classrooms(self) -> list[ClassRoom]:
        return list(_CLASSROOMS)

    def exists(self, classroom_id: str) -> bool:
        return any(classroom.id == classroom_id for classroom in _CLASSROOMS)

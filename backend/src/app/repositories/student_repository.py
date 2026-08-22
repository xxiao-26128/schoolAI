from app.schemas.student import Student

# Mirrors frontend/src/data/mockData.ts.
_STUDENTS: list[Student] = [
    Student(id="student-jane-5a", name="Jane Doe", classroomId="class-5a"),
    Student(id="student-mike-5a", name="Mike Chen", classroomId="class-5a"),
    Student(id="student-sofia-5b", name="Sofia Rossi", classroomId="class-5b"),
    Student(id="student-liam-5b", name="Liam Walker", classroomId="class-5b"),
    Student(id="student-priya-5b", name="Priya Patel", classroomId="class-5b"),
    Student(id="student-jane-3b", name="Jane Doe", classroomId="class-3b"),
    Student(id="student-alex-3b", name="Alex Kim", classroomId="class-3b"),
]


class StudentRepository:
    """Data access for students.

    Backed by in-memory mock data for now; once app/db/ has real
    persistence, swap the body below for an actual query without
    changing any caller.
    """

    def list_students(self) -> list[Student]:
        return list(_STUDENTS)

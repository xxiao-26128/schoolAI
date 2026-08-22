import type { StudentListResponse } from "../contracts/student";
import { mapStudentResponse } from "../mappers/studentMapper";
import { apiGet } from "../client";
import type { Student } from "../../models/student";

const PAGE_LIMIT = 100;

// The dropdown needs the classroom's full roster, not one page, so this
// follows the returned cursor until the backend says there's no more —
// never guesses page numbers itself.
export async function fetchStudentsByClassroom(classroomId: string): Promise<Student[]> {
  const students: Student[] = [];
  let cursor: string | undefined;

  do {
    const params = new URLSearchParams({ classroom_id: classroomId, limit: String(PAGE_LIMIT) });
    if (cursor) {
      params.set("cursor", cursor);
    }

    const response = await apiGet<StudentListResponse>(`/api/v1/students?${params.toString()}`);
    students.push(...response.items.map(mapStudentResponse));
    cursor = response.hasMore && response.nextCursor ? response.nextCursor : undefined;
  } while (cursor);

  return students;
}

import type { StudentResponse } from "../contracts/student";
import type { Student } from "../../models/student";

export function mapStudentResponse(response: StudentResponse): Student {
  return {
    id: response.id,
    displayName: response.name,
    classroomId: response.classroomId,
  };
}

import type { ClassroomResponse } from "../contracts/classroom";
import type { Classroom } from "../../models/classroom";

export function mapClassroomResponse(response: ClassroomResponse): Classroom {
  return {
    id: response.id,
    label: response.name,
  };
}

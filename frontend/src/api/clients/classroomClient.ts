import type { ClassroomListResponse } from "../contracts/classroom";
import { mapClassroomResponse } from "../mappers/classroomMapper";
import { apiGet } from "../client";
import type { Classroom } from "../../models/classroom";

export async function fetchClassrooms(): Promise<Classroom[]> {
  const { items } = await apiGet<ClassroomListResponse>("/api/v1/classrooms");
  return items.map(mapClassroomResponse);
}

// Frontend-only sentinel for "no student filter" (the "All Students"
// option) — never sent to or returned by the backend.
export const ALL_STUDENTS_ID = "";

export interface Student {
  id: string;
  displayName: string;
  classroomId: string;
}

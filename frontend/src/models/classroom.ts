// Frontend-only sentinel for "no classroom filter" — never sent to or
// returned by the backend.
export const EVERYONE_ID = "everyone";

export interface Classroom {
  id: string;
  label: string;
}

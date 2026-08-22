// Shape exactly as the backend sends it over the wire (GET /api/v1/students).

export interface StudentResponse {
  id: string;
  name: string;
  classroomId: string;
}

export interface StudentListResponse {
  items: StudentResponse[];
  nextCursor: string | null;
  hasMore: boolean;
}

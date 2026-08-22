// Shape exactly as the backend sends it over the wire (GET /api/v1/classrooms).

export interface ClassroomResponse {
  id: string;
  name: string;
}

export interface ClassroomListResponse {
  items: ClassroomResponse[];
}

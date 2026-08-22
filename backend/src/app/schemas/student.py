from pydantic import BaseModel, ConfigDict, Field


class Student(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    classroom_id: str = Field(alias="classroomId", serialization_alias="classroomId")


class StudentList(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    items: list[Student]
    next_cursor: str | None = Field(
        default=None, alias="nextCursor", serialization_alias="nextCursor"
    )
    has_more: bool = Field(alias="hasMore", serialization_alias="hasMore")

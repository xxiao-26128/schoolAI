from pydantic import BaseModel, ConfigDict


class ClassRoom(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str


class ClassroomList(BaseModel):
    items: list[ClassRoom]

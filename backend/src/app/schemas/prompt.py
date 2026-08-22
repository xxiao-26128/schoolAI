from pydantic import BaseModel


class Prompt(BaseModel):
    id: str
    title: str


class PromptList(BaseModel):
    items: list[Prompt]

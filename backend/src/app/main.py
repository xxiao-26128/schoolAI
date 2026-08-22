from fastapi import FastAPI

from app.api.chats import router as chats_router
from app.api.classrooms import router as classrooms_router
from app.api.discussion_summary import router as discussion_summary_router
from app.api.prompt_suggestions import router as prompt_suggestions_router
from app.api.students import router as students_router

app = FastAPI(title="schoolAI backend")
app.include_router(classrooms_router)
app.include_router(students_router)
app.include_router(prompt_suggestions_router)
app.include_router(chats_router)
app.include_router(discussion_summary_router)

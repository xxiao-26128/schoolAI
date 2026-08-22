from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chats import router as chats_router
from app.api.classrooms import router as classrooms_router
from app.api.discussion_summary import router as discussion_summary_router
from app.api.prompt_suggestions import router as prompt_suggestions_router
from app.api.students import router as students_router
from app.core.config import ALLOWED_ORIGINS

app = FastAPI(title="schoolAI backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(classrooms_router)
app.include_router(students_router)
app.include_router(prompt_suggestions_router)
app.include_router(chats_router)
app.include_router(discussion_summary_router)

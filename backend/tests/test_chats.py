from fastapi.testclient import TestClient

from app.main import app
from app.repositories.chat_repository import ChatRepository
from app.services.chat_service import ChatService

client = TestClient(app)


def test_create_chat_with_no_scope_returns_201():
    response = client.post("/api/v1/chats", json={})
    assert response.status_code == 201

    body = response.json()
    assert body["classroomId"] is None
    assert body["studentId"] is None
    assert body["title"] is None
    assert body["id"]
    assert body["createdAt"] == body["updatedAt"]


def test_create_chat_scoped_to_classroom():
    body = client.post("/api/v1/chats", json={"classroomId": "class-5a"}).json()
    assert body["classroomId"] == "class-5a"
    assert body["studentId"] is None


def test_create_chat_scoped_to_student():
    body = client.post(
        "/api/v1/chats",
        json={"classroomId": "class-5a", "studentId": "student-jane-5a"},
    ).json()
    assert body["classroomId"] == "class-5a"
    assert body["studentId"] == "student-jane-5a"


def test_create_chat_unknown_classroom_returns_404():
    response = client.post("/api/v1/chats", json={"classroomId": "class-9z"})
    assert response.status_code == 404


def test_create_chat_student_not_in_given_classroom_returns_404():
    response = client.post(
        "/api/v1/chats",
        json={"classroomId": "class-3b", "studentId": "student-jane-5a"},
    )
    assert response.status_code == 404


def test_create_chat_student_without_classroom_returns_400():
    response = client.post(
        "/api/v1/chats", json={"studentId": "student-jane-5a"}
    )
    assert response.status_code == 400


def test_create_chat_generates_unique_ids():
    first = client.post("/api/v1/chats", json={}).json()
    second = client.post("/api/v1/chats", json={}).json()
    assert first["id"] != second["id"]


def test_create_chat_response_uses_camel_case_keys():
    raw_body = client.post("/api/v1/chats", json={"classroomId": "class-5a"}).text
    assert '"classroomId"' in raw_body
    assert '"studentId"' in raw_body
    assert '"createdAt"' in raw_body
    assert '"updatedAt"' in raw_body
    assert "classroom_id" not in raw_body
    assert "student_id" not in raw_body
    assert "created_at" not in raw_body
    assert "updated_at" not in raw_body


def test_send_message_returns_user_and_assistant_messages():
    chat = client.post("/api/v1/chats", json={}).json()

    response = client.post(
        f"/api/v1/chats/{chat['id']}/messages", json={"content": "Hi Claire"}
    )
    assert response.status_code == 201

    body = response.json()
    assert body["userMessage"]["role"] == "user"
    assert body["userMessage"]["content"] == "Hi Claire"
    assert body["userMessage"]["chatId"] == chat["id"]
    assert body["assistantMessage"]["role"] == "assistant"
    assert body["assistantMessage"]["content"]
    assert body["assistantMessage"]["chatId"] == chat["id"]
    assert body["userMessage"]["id"] != body["assistantMessage"]["id"]


def test_send_message_to_unknown_chat_returns_404():
    response = client.post(
        "/api/v1/chats/not-a-real-chat-id/messages", json={"content": "Hi"}
    )
    assert response.status_code == 404


def test_send_message_rejects_empty_content():
    chat = client.post("/api/v1/chats", json={}).json()
    response = client.post(f"/api/v1/chats/{chat['id']}/messages", json={"content": ""})
    assert response.status_code == 422


def test_send_message_updates_chat_updated_at():
    # No GET /chats/{id} endpoint exists yet to observe this over HTTP, so
    # this checks the repository directly (it shares the same in-memory
    # store as the HTTP-driven client above).
    service = ChatService()
    chat = service.create_chat(classroom_id=None, student_id=None)

    service.send_message(chat.id, "hello")

    stored_chat = ChatRepository().get(chat.id)
    assert stored_chat.updated_at > chat.created_at

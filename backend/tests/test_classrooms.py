from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_classrooms_returns_200():
    response = client.get("/api/v1/classrooms")
    assert response.status_code == 200


def test_classrooms_exclude_everyone_sentinel():
    items = client.get("/api/v1/classrooms").json()["items"]
    ids = {c["id"] for c in items}
    assert "everyone" not in ids
    assert ids == {"class-5a", "class-5b", "class-3b"}

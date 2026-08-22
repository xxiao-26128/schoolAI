from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_prompt_suggestions_returns_200():
    response = client.get("/api/v1/prompts")
    assert response.status_code == 200


def test_prompt_suggestions_returns_expected_items():
    items = client.get("/api/v1/prompts").json()["items"]
    assert items == [
        {"id": "p1", "title": "Show me student detail"},
        {"id": "p2", "title": "Prompt"},
    ]

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

EXPECTED_TOPICS = {
    "keyDiscussionTheme",
    "commonQuestions",
    "studentInterest",
    "studentEngagement",
}


def test_discussion_summary_returns_200():
    response = client.get("/api/v1/discussion-summary")
    assert response.status_code == 200


def test_discussion_summary_default_shape():
    body = client.get("/api/v1/discussion-summary").json()
    assert isinstance(body["discussionCount"], int)
    assert set(body["summary"].keys()) == EXPECTED_TOPICS
    for topic in EXPECTED_TOPICS:
        assert isinstance(body["summary"][topic]["content"], str)
        assert body["summary"][topic]["content"]


def test_discussion_summary_scoped_to_classroom_and_student():
    response = client.get(
        "/api/v1/discussion-summary",
        params={"classroom_id": "class-5a", "student_id": "student-jane-5a"},
    )
    assert response.status_code == 200


def test_discussion_summary_unknown_classroom_returns_404():
    response = client.get(
        "/api/v1/discussion-summary", params={"classroom_id": "class-9z"}
    )
    assert response.status_code == 404


def test_discussion_summary_student_not_in_given_classroom_returns_404():
    response = client.get(
        "/api/v1/discussion-summary",
        params={"classroom_id": "class-3b", "student_id": "student-jane-5a"},
    )
    assert response.status_code == 404


def test_discussion_summary_student_without_classroom_returns_400():
    response = client.get(
        "/api/v1/discussion-summary", params={"student_id": "student-jane-5a"}
    )
    assert response.status_code == 400


def test_discussion_summary_invalid_time_returns_400():
    response = client.get("/api/v1/discussion-summary", params={"time": "5Y"})
    assert response.status_code == 400


def test_discussion_summary_custom_without_dates_returns_400():
    response = client.get("/api/v1/discussion-summary", params={"time": "Custom"})
    assert response.status_code == 400


def test_discussion_summary_custom_with_dates_returns_200():
    response = client.get(
        "/api/v1/discussion-summary",
        params={"time": "Custom", "start": "2026-08-01", "end": "2026-08-15"},
    )
    assert response.status_code == 200


def test_discussion_summary_response_uses_camel_case_keys():
    raw_body = client.get("/api/v1/discussion-summary").text
    assert '"discussionCount"' in raw_body
    assert '"keyDiscussionTheme"' in raw_body
    assert "discussion_count" not in raw_body

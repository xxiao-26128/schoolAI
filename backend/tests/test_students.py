from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

# Full roster sorted by (name, id) — the service's tiebreak order. The two
# "Jane Doe"s (ids student-jane-3b, student-jane-5a) land next to each other,
# ordered by id since "3b" < "5a" as strings.
ALL_STUDENT_IDS_IN_ORDER = [
    "student-alex-3b",
    "student-jane-3b",
    "student-jane-5a",
    "student-liam-5b",
    "student-mike-5a",
    "student-priya-5b",
    "student-sofia-5b",
]


def test_students_returns_200():
    response = client.get("/api/v1/students")
    assert response.status_code == 200


def test_students_default_returns_all_sorted_by_name():
    body = client.get("/api/v1/students").json()
    assert [s["id"] for s in body["items"]] == ALL_STUDENT_IDS_IN_ORDER
    assert body["hasMore"] is False
    assert body["nextCursor"] is None


def test_students_filtered_by_classroom():
    body = client.get("/api/v1/students", params={"classroom_id": "class-5a"}).json()
    assert [s["id"] for s in body["items"]] == ["student-jane-5a", "student-mike-5a"]
    assert body["hasMore"] is False


def test_students_unknown_classroom_returns_404():
    response = client.get("/api/v1/students", params={"classroom_id": "class-9z"})
    assert response.status_code == 404


def test_students_search_is_case_insensitive_substring_match():
    body = client.get("/api/v1/students", params={"search": "jane"}).json()
    assert [s["id"] for s in body["items"]] == ["student-jane-3b", "student-jane-5a"]

    body = client.get("/api/v1/students", params={"search": "ALEX"}).json()
    assert [s["id"] for s in body["items"]] == ["student-alex-3b"]


def test_students_pagination_walks_through_all_without_duplicates_or_gaps():
    seen_ids: list[str] = []
    cursor = None

    for _ in range(len(ALL_STUDENT_IDS_IN_ORDER) + 1):
        params = {"limit": 2}
        if cursor is not None:
            params["cursor"] = cursor
        body = client.get("/api/v1/students", params=params).json()
        seen_ids.extend(s["id"] for s in body["items"])
        if not body["hasMore"]:
            assert body["nextCursor"] is None
            break
        cursor = body["nextCursor"]
    else:
        raise AssertionError("pagination did not terminate")

    assert seen_ids == ALL_STUDENT_IDS_IN_ORDER


def test_students_pagination_disambiguates_duplicate_names_at_limit_one():
    first = client.get("/api/v1/students", params={"limit": 1}).json()
    assert [s["id"] for s in first["items"]] == ["student-alex-3b"]
    assert first["hasMore"] is True

    second = client.get(
        "/api/v1/students", params={"limit": 1, "cursor": first["nextCursor"]}
    ).json()
    assert [s["id"] for s in second["items"]] == ["student-jane-3b"]

    third = client.get(
        "/api/v1/students", params={"limit": 1, "cursor": second["nextCursor"]}
    ).json()
    assert [s["id"] for s in third["items"]] == ["student-jane-5a"]


def test_students_invalid_cursor_returns_400():
    response = client.get("/api/v1/students", params={"cursor": "not-a-real-cursor"})
    assert response.status_code == 400


def test_students_response_uses_camel_case_keys():
    raw_body = client.get("/api/v1/students").text
    assert '"classroomId"' in raw_body
    assert '"nextCursor"' in raw_body
    assert '"hasMore"' in raw_body
    assert "classroom_id" not in raw_body
    assert "next_cursor" not in raw_body
    assert "has_more" not in raw_body

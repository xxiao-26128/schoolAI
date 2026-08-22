from pydantic import BaseModel, ConfigDict, Field


class TopicSummary(BaseModel):
    content: str


class DiscussionSummaryResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    discussion_count: int = Field(
        alias="discussionCount", serialization_alias="discussionCount"
    )
    # Keyed by topic (e.g. "keyDiscussionTheme"), not a fixed set of fields —
    # adding a new topic later is just adding a key, no schema change.
    summary: dict[str, TopicSummary]

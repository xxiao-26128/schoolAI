from datetime import date

from app.schemas.discussion_summary import DiscussionSummaryResponse, TopicSummary

_PLACEHOLDER_CONTENT = (
    "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate "
    "libero et velit interdum, ac aliquet odio mattis."
)


class DiscussionSummaryRepository:
    """Stub data for now.

    Real discussion-summary generation (analyzing transcripts, most likely
    via an offline/batch process rather than inline per-request) is a
    separate, not-yet-built piece of work. This just returns fixed
    placeholder content so the endpoint has a real shape to build against.
    """

    def get_summary(
        self,
        classroom_id: str | None,
        student_id: str | None,
        time: str,
        start: date | None,
        end: date | None,
    ) -> DiscussionSummaryResponse:
        return DiscussionSummaryResponse(
            discussionCount=52,
            summary={
                "keyDiscussionTheme": TopicSummary(content=_PLACEHOLDER_CONTENT),
                "commonQuestions": TopicSummary(content=_PLACEHOLDER_CONTENT),
                "studentInterest": TopicSummary(content=_PLACEHOLDER_CONTENT),
                "studentEngagement": TopicSummary(content=_PLACEHOLDER_CONTENT),
            },
        )

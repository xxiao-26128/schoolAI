class ChatAgentService:
    """Generates Claire AI's reply to a teacher's message.

    Stub only: no LLM is called yet. This is deliberately isolated behind
    its own class so real integration (e.g. the Claude API, plus whatever
    tool-use against classroom/student data Claire AI ends up needing) can
    replace generate_reply's body without changing ChatService or the route.
    Still open: whether this becomes a separate deployable process or stays
    an in-process module.
    """

    def generate_reply(self, message_content: str) -> str:
        return (
            "This is a placeholder reply from Claire AI — real LLM "
            "integration isn't wired up yet."
        )

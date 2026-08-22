import { useEffect, useState } from "react";
import { TopBar } from "./components/layout/TopBar";
import { FilterBar } from "./components/filters/FilterBar";
import { DiscussionSummaryCard } from "./components/insights/DiscussionSummaryCard";
import { AssessmentSummaryCard } from "./components/insights/AssessmentSummaryCard";
import { ChatPanel } from "./components/chat/ChatPanel";
import { createChat, sendChatMessage } from "./api/clients/chatClient";
import { fetchClassrooms } from "./api/clients/classroomClient";
import { fetchPromptSuggestions } from "./api/clients/promptClient";
import { fetchStudentsByClassroom } from "./api/clients/studentClient";
import { discussionSections, mockChatMessages, timeRanges } from "./data/mockData";
import { EVERYONE_ID, type Classroom } from "./models/classroom";
import type { ChatMessage } from "./models/chatMessage";
import type { PromptSuggestion } from "./models/promptSuggestion";
import { ALL_STUDENTS_ID, type Student } from "./models/student";
import type { DateRange, FetchStatus, TimeRange } from "./types";

function App() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [classroomsStatus, setClassroomsStatus] = useState<FetchStatus>("loading");
  const [classroomsReloadKey, setClassroomsReloadKey] = useState(0);

  const [selectedClassroomId, setSelectedClassroomId] = useState(EVERYONE_ID);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsStatus, setStudentsStatus] = useState<FetchStatus>("ready");
  const [studentsReloadKey, setStudentsReloadKey] = useState(0);
  const [selectedStudentId, setSelectedStudentId] = useState(ALL_STUDENTS_ID);

  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("All");
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);

  const [promptSuggestions, setPromptSuggestions] = useState<PromptSuggestion[]>([]);
  const [promptSuggestionsStatus, setPromptSuggestionsStatus] = useState<FetchStatus>("loading");
  const [promptSuggestionsReloadKey, setPromptSuggestionsReloadKey] = useState(0);

  const [chatId, setChatId] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState<FetchStatus>("loading");
  const [chatReloadKey, setChatReloadKey] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [messageInput, setMessageInput] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [sendMessageError, setSendMessageError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchClassrooms()
      .then((items) => {
        if (cancelled) return;
        setClassrooms(items);
        setClassroomsStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setClassroomsStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [classroomsReloadKey]);

  useEffect(() => {
    if (selectedClassroomId === EVERYONE_ID) {
      return;
    }

    let cancelled = false;

    fetchStudentsByClassroom(selectedClassroomId)
      .then((items) => {
        if (cancelled) return;
        setStudents(items);
        setStudentsStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStudentsStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [selectedClassroomId, studentsReloadKey]);

  useEffect(() => {
    let cancelled = false;

    fetchPromptSuggestions()
      .then((items) => {
        if (cancelled) return;
        setPromptSuggestions(items);
        setPromptSuggestionsStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setPromptSuggestionsStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [promptSuggestionsReloadKey]);

  // Chat is scoped to the current classroom/student selection — a new
  // audience gets a fresh chat (there's no backend endpoint yet to list or
  // resume a previous one).
  useEffect(() => {
    let cancelled = false;

    createChat({
      classroomId: selectedClassroomId === EVERYONE_ID ? null : selectedClassroomId,
      studentId: selectedStudentId === ALL_STUDENTS_ID ? null : selectedStudentId,
    })
      .then((newChatId) => {
        if (cancelled) return;
        setChatId(newChatId);
        setChatStatus("ready");
        setChatMessages([]);
      })
      .catch(() => {
        if (cancelled) return;
        setChatStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [selectedClassroomId, selectedStudentId, chatReloadKey]);

  function handleClassroomChange(classroomId: string) {
    setSelectedClassroomId(classroomId);
    setSelectedStudentId(ALL_STUDENTS_ID);
    resetChatSession();

    if (classroomId === EVERYONE_ID) {
      setStudents([]);
      setStudentsStatus("ready");
    } else {
      setStudentsStatus("loading");
    }
  }

  function handleStudentChange(studentId: string) {
    setSelectedStudentId(studentId);
    resetChatSession();
  }

  function resetChatSession() {
    setChatId(null);
    setChatStatus("loading");
    setChatMessages([]);
    setMessageInput("");
    setSendMessageError(false);
  }

  function handleRetryClassrooms() {
    setClassroomsStatus("loading");
    setClassroomsReloadKey((key) => key + 1);
  }

  function handleRetryStudents() {
    setStudentsStatus("loading");
    setStudentsReloadKey((key) => key + 1);
  }

  function handleRetryPromptSuggestions() {
    setPromptSuggestionsStatus("loading");
    setPromptSuggestionsReloadKey((key) => key + 1);
  }

  function handleNewChat() {
    resetChatSession();
    setChatReloadKey((key) => key + 1);
  }

  function handleSendMessage() {
    const content = messageInput.trim();
    if (!chatId || content === "" || isSendingMessage) return;

    setIsSendingMessage(true);
    setSendMessageError(false);

    sendChatMessage(chatId, content)
      .then(({ userMessage, assistantMessage }) => {
        setChatMessages((prev) => [...prev, userMessage, assistantMessage]);
        setMessageInput("");
      })
      .catch(() => {
        setSendMessageError(true);
      })
      .finally(() => {
        setIsSendingMessage(false);
      });
  }

  return (
    <div className="flex h-screen flex-col bg-white text-gray-900">
      <TopBar breadcrumb="Student Growth Insight" />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <h1 className="mb-5 text-2xl font-bold text-gray-900">Student Growth Insight</h1>

          <div className="mb-6">
            <FilterBar
              classrooms={classrooms}
              classroomsStatus={classroomsStatus}
              onRetryClassrooms={handleRetryClassrooms}
              selectedClassroomId={selectedClassroomId}
              onClassroomChange={handleClassroomChange}
              students={students}
              studentsStatus={studentsStatus}
              onRetryStudents={handleRetryStudents}
              selectedStudentId={selectedStudentId}
              onStudentChange={handleStudentChange}
              timeRanges={timeRanges}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={setSelectedTimeRange}
              customDateRange={customDateRange}
              onCustomDateRangeChange={setCustomDateRange}
            />
          </div>

          <div className="flex flex-col gap-6">
            <DiscussionSummaryCard sections={discussionSections} discussionCount={52} />
            <AssessmentSummaryCard assessmentCount={52} />
          </div>
        </main>

        <ChatPanel
          chatStatus={chatStatus}
          onRetryChat={handleNewChat}
          messages={chatMessages}
          messageInput={messageInput}
          onMessageInputChange={setMessageInput}
          onSendMessage={handleSendMessage}
          isSendingMessage={isSendingMessage}
          sendError={sendMessageError}
          onNewChat={handleNewChat}
          suggestions={promptSuggestions}
          suggestionsStatus={promptSuggestionsStatus}
          onRetrySuggestions={handleRetryPromptSuggestions}
        />
      </div>
    </div>
  );
}

export default App;

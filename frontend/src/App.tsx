import { useState } from "react";
import { TopBar } from "./components/layout/TopBar";
import { FilterBar } from "./components/filters/FilterBar";
import { DiscussionSummaryCard } from "./components/insights/DiscussionSummaryCard";
import { AssessmentSummaryCard } from "./components/insights/AssessmentSummaryCard";
import { ChatPanel } from "./components/chat/ChatPanel";
import {
  chatMessages,
  classroomOptions,
  discussionSections,
  promptSuggestions,
  studentOptions,
  timeRanges,
} from "./data/mockData";
import type { DateRange, TimeRange } from "./types";

function App() {
  const [selectedClassroomId, setSelectedClassroomId] = useState(classroomOptions[0].id);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("All");
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);

  function handleClassroomChange(classroomId: string) {
    setSelectedClassroomId(classroomId);
    setSelectedStudentId("");
  }

  return (
    <div className="flex h-screen flex-col bg-white text-gray-900">
      <TopBar breadcrumb="Student Growth Insight" />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <h1 className="mb-5 text-2xl font-bold text-gray-900">Student Growth Insight</h1>

          <div className="mb-6">
            <FilterBar
              classroomOptions={classroomOptions}
              selectedClassroomId={selectedClassroomId}
              onClassroomChange={handleClassroomChange}
              studentOptions={studentOptions}
              selectedStudentId={selectedStudentId}
              onStudentChange={setSelectedStudentId}
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

        <ChatPanel messages={chatMessages} suggestions={promptSuggestions} />
      </div>
    </div>
  );
}

export default App;

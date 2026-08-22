import { useEffect, useRef, useState } from "react";
import { EVERYONE_ID, type Classroom } from "../../models/classroom";
import { ALL_STUDENTS_ID, type Student } from "../../models/student";
import type { DateRange, FetchStatus, TimeRange } from "../../types";
import { CalendarIcon, ChevronDownIcon } from "../icons";
import { CustomDateRangePicker } from "./CustomDateRangePicker";

interface FilterBarProps {
  classrooms: Classroom[];
  classroomsStatus: FetchStatus;
  onRetryClassrooms: () => void;
  selectedClassroomId: string;
  onClassroomChange: (id: string) => void;
  students: Student[];
  studentsStatus: FetchStatus;
  onRetryStudents: () => void;
  selectedStudentId: string;
  onStudentChange: (id: string) => void;
  timeRanges: TimeRange[];
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  customDateRange: DateRange | null;
  onCustomDateRangeChange: (range: DateRange) => void;
}

export function FilterBar({
  classrooms,
  classroomsStatus,
  onRetryClassrooms,
  selectedClassroomId,
  onClassroomChange,
  students,
  studentsStatus,
  onRetryStudents,
  selectedStudentId,
  onStudentChange,
  timeRanges,
  selectedTimeRange,
  onTimeRangeChange,
  customDateRange,
  onCustomDateRangeChange,
}: FilterBarProps) {
  const isEveryoneSelected = selectedClassroomId === EVERYONE_ID;
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const customFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPickerOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!customFilterRef.current?.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isPickerOpen]);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={selectedClassroomId}
            onChange={(event) => onClassroomChange(event.target.value)}
            disabled={classroomsStatus !== "ready"}
            className="w-56 appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-9 text-sm text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            {classroomsStatus === "loading" && <option>Loading classrooms…</option>}
            {classroomsStatus === "error" && <option>Failed to load classrooms</option>}
            {classroomsStatus === "ready" && (
              <>
                <option value={EVERYONE_ID}>Everyone</option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.label}
                  </option>
                ))}
              </>
            )}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {classroomsStatus === "error" && (
          <button
            type="button"
            onClick={onRetryClassrooms}
            className="text-sm font-medium text-violet-700 hover:text-violet-800"
          >
            Retry
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={selectedStudentId}
            onChange={(event) => onStudentChange(event.target.value)}
            disabled={isEveryoneSelected || studentsStatus !== "ready"}
            className="w-56 appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-9 text-sm text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            {!isEveryoneSelected && studentsStatus === "loading" && (
              <option>Loading students…</option>
            )}
            {!isEveryoneSelected && studentsStatus === "error" && (
              <option>Failed to load students</option>
            )}
            {(isEveryoneSelected || studentsStatus === "ready") && (
              <>
                <option value={ALL_STUDENTS_ID}>All Students</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.displayName}
                  </option>
                ))}
              </>
            )}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {!isEveryoneSelected && studentsStatus === "error" && (
          <button
            type="button"
            onClick={onRetryStudents}
            className="text-sm font-medium text-violet-700 hover:text-violet-800"
          >
            Retry
          </button>
        )}
      </div>

      <div ref={customFilterRef} className="relative flex rounded-lg border border-violet-300 p-0.5">
        {timeRanges.map((range) => {
          const isSelected = range === selectedTimeRange;
          return (
            <button
              key={range}
              type="button"
              onClick={() => {
                if (range === "Custom") {
                  setIsPickerOpen((open) => !open);
                  return;
                }
                setIsPickerOpen(false);
                onTimeRangeChange(range);
              }}
              className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-violet-700 text-white"
                  : "text-violet-700 hover:bg-violet-50"
              }`}
            >
              {range === "Custom" && <CalendarIcon />}
              {range}
            </button>
          );
        })}

        {isPickerOpen && (
          <CustomDateRangePicker
            initialRange={customDateRange}
            onCancel={() => setIsPickerOpen(false)}
            onApply={(range) => {
              onCustomDateRangeChange(range);
              onTimeRangeChange("Custom");
              setIsPickerOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

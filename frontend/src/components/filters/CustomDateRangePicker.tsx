import { useState } from "react";
import type { DateRange } from "../../types";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

interface CustomDateRangePickerProps {
  initialRange: DateRange | null;
  onApply: (range: DateRange) => void;
  onCancel: () => void;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function buildMonthGrid(monthStart: Date): Date[] {
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() - monthStart.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + i);
    return day;
  });
}

export function CustomDateRangePicker({ initialRange, onApply, onCancel }: CustomDateRangePickerProps) {
  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(initialRange ? new Date(initialRange.start) : new Date()),
  );
  const [draftStart, setDraftStart] = useState<string | null>(initialRange?.start ?? null);
  const [draftEnd, setDraftEnd] = useState<string | null>(initialRange?.end ?? null);

  const days = buildMonthGrid(viewMonth);
  const monthLabel = viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  function handleDayClick(iso: string) {
    if (!draftStart || draftEnd) {
      setDraftStart(iso);
      setDraftEnd(null);
      return;
    }
    if (iso < draftStart) {
      setDraftEnd(draftStart);
      setDraftStart(iso);
    } else {
      setDraftEnd(iso);
    }
  }

  function isInRange(iso: string): boolean {
    return draftStart !== null && draftEnd !== null && iso > draftStart && iso < draftEnd;
  }

  return (
    <div className="absolute right-0 top-full z-10 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
          className="text-gray-500 hover:text-gray-800"
        >
          <ChevronLeftIcon />
        </button>
        <span className="text-sm font-medium text-gray-800">{monthLabel}</span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
          className="text-gray-500 hover:text-gray-800"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-xs text-gray-400">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {days.map((day) => {
          const iso = toISODate(day);
          const inCurrentMonth = day.getMonth() === viewMonth.getMonth();
          const isEndpoint = iso === draftStart || iso === draftEnd;
          const inRange = isInRange(iso);

          return (
            <button
              key={iso}
              type="button"
              onClick={() => handleDayClick(iso)}
              className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
                inCurrentMonth ? "text-gray-700" : "text-gray-300"
              } ${isEndpoint ? "bg-violet-700 text-white" : inRange ? "bg-violet-50" : "hover:bg-gray-100"}`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!draftStart || !draftEnd}
          onClick={() => draftStart && draftEnd && onApply({ start: draftStart, end: draftEnd })}
          className="rounded-md bg-violet-700 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-40"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

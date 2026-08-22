export type TimeRange = "7D" | "1M" | "3M" | "All" | "Custom";

export type FetchStatus = "loading" | "error" | "ready";

export interface DateRange {
  start: string;
  end: string;
}

export interface InsightSection {
  id: string;
  icon: "theme" | "question" | "interest" | "engagement";
  title: string;
  body: string;
}

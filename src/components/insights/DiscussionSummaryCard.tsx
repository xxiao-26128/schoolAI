import type { InsightSection } from "../../types";
import { InsightSubCard } from "./InsightSubCard";

interface DiscussionSummaryCardProps {
  sections: InsightSection[];
  discussionCount: number;
}

export function DiscussionSummaryCard({ sections, discussionCount }: DiscussionSummaryCardProps) {
  return (
    <section className="rounded-xl border border-gray-200 p-6">
      <h2 className="mb-4 flex items-baseline gap-2 text-lg font-semibold text-gray-900">
        Student Discussion Summary
        <span className="text-sm font-normal text-gray-400">
          {discussionCount} Discussion Included
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <InsightSubCard key={section.id} {...section} />
        ))}
      </div>
    </section>
  );
}

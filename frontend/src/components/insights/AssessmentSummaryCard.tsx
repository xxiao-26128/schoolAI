interface AssessmentSummaryCardProps {
  assessmentCount: number;
}

export function AssessmentSummaryCard({ assessmentCount }: AssessmentSummaryCardProps) {
  return (
    <section className="rounded-xl border border-gray-200 p-6">
      <h2 className="mb-4 flex items-baseline gap-2 border-b border-gray-100 pb-4 text-lg font-semibold text-gray-900">
        Assessment Summary
        <span className="text-sm font-normal text-gray-400">
          {assessmentCount} Assessment Included
        </span>
      </h2>
      <div className="flex h-32 items-center justify-center text-sm text-gray-400">
        Assessment score breakdown coming soon
      </div>
    </section>
  );
}

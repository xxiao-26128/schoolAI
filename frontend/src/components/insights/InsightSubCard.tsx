import type { InsightSection } from "../../types";
import { EngagementIcon, InterestIcon, QuestionIcon, ThemeIcon } from "../icons";

const iconByType: Record<InsightSection["icon"], typeof ThemeIcon> = {
  theme: ThemeIcon,
  question: QuestionIcon,
  interest: InterestIcon,
  engagement: EngagementIcon,
};

export function InsightSubCard({ icon, title, body }: InsightSection) {
  const Icon = iconByType[icon];

  return (
    <div className="rounded-lg bg-gray-50 p-5">
      <div className="mb-2 flex items-center gap-2 font-semibold text-violet-700">
        <Icon />
        <span>{title}</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-600">{body}</p>
    </div>
  );
}

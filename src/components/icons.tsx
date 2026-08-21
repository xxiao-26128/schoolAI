import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const HomeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const LayoutIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M14 4v16" />
  </svg>
);

export const SparkleIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

export const HistoryIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
    <path d="M12 7v5l3 3" />
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ThemeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="7" r="2" />
    <path d="M7 15V9a4 4 0 0 1 4-4h1" />
  </svg>
);

export const QuestionIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.2a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 1.7-2.4 3.5" />
    <path d="M12 17.2h.01" />
  </svg>
);

export const InterestIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="7" cy="8" r="2" />
    <circle cx="17" cy="8" r="2" />
    <path d="M4 19c0-2.2 1.3-4 3-4s3 1.8 3 4M14 19c0-2.2 1.3-4 3-4s3 1.8 3 4" />
  </svg>
);

export const EngagementIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="5" cy="6" r="1.4" />
    <circle cx="19" cy="6" r="1.4" />
    <circle cx="5" cy="18" r="1.4" />
    <circle cx="19" cy="18" r="1.4" />
    <path d="M12 12 5 6M12 12l7-6M12 12l-7 6M12 12l7 6" />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="9" y="9" width="12" height="12" rx="1.5" />
    <path d="M5 15V5a1.5 1.5 0 0 1 1.5-1.5H15" />
  </svg>
);

export const SpeakerIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 9v6h4l5 4V5L9 9H5Z" />
    <path d="M17 9a4 4 0 0 1 0 6" />
  </svg>
);

export const TranslateIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 6h9M8 4v2c0 3.5-2 6.5-5 8" />
    <path d="M4 15c1.8 0 3.6-.7 5-2 1.3 1.2 2.9 1.9 4.6 2" />
    <path d="m14 20 4-9 4 9M15.3 17h5.4" />
  </svg>
);

export const QuoteIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M7 8c-2 1-3 2.6-3 5s1.3 4 3 4M15 8c-2 1-3 2.6-3 5s1.3 4 3 4" />
  </svg>
);

export const AttachIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m8 12 6.5-6.5a3.5 3.5 0 0 1 5 5L11 19a5.5 5.5 0 0 1-8-8l7-7" />
  </svg>
);

export const ScissorsIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <path d="M8 7.5 20 18M8 16.5 20 6" />
  </svg>
);

export const DownloadIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 4v11m0 0-4-4m4 4 4-4" />
    <path d="M5 19h14" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MicIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

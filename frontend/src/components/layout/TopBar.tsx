import { HistoryIcon, HomeIcon, LayoutIcon, SparkleIcon } from "../icons";

interface TopBarProps {
  breadcrumb: string;
}

export function TopBar({ breadcrumb }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <HomeIcon className="text-gray-700" />
        <span className="text-gray-300">›</span>
        <span className="text-gray-700">{breadcrumb}</span>
      </nav>
      <div className="flex items-center gap-4 text-gray-500">
        <button type="button" aria-label="Layout" className="hover:text-gray-800">
          <LayoutIcon />
        </button>
        <button type="button" aria-label="AI assistant" className="text-violet-600 hover:text-violet-700">
          <SparkleIcon />
        </button>
        <button type="button" aria-label="History" className="hover:text-gray-800">
          <HistoryIcon />
        </button>
      </div>
    </header>
  );
}

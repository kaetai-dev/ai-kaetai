import { Tool } from '@/types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  emptyMessage?: string;
  showAlternativeCounts?: boolean;
  alternativeCounts?: Record<string, number>;
}

export default function ToolGrid({
  tools,
  emptyMessage = 'ツールが見つかりませんでした',
  showAlternativeCounts = false,
  alternativeCounts = {},
}: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          className="w-12 h-12 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          showAlternativeCount={showAlternativeCounts}
          alternativeCount={alternativeCounts[tool.slug]}
        />
      ))}
    </div>
  );
}

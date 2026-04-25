'use client';

import { useState, useCallback } from 'react';
import { Tool } from '@/types';
import SearchBar from './SearchBar';
import ToolGrid from './ToolGrid';

interface CategoryToolsClientProps {
  tools: Tool[];
  alternativeCounts: Record<string, number>;
  categoryName: string;
}

export default function CategoryToolsClient({
  tools,
  alternativeCounts,
  categoryName,
}: CategoryToolsClientProps) {
  const [filtered, setFiltered] = useState<Tool[]>(tools);

  const handleFilter = useCallback((result: Tool[]) => {
    setFiltered(result);
  }, []);

  return (
    <>
      <div className="mt-8">
        <SearchBar
          tools={tools}
          onFilter={handleFilter}
          placeholder={`${categoryName}のツールを検索...`}
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filtered.length}件のツールが見つかりました
          </p>
        </div>
        <ToolGrid
          tools={filtered}
          emptyMessage="検索条件に合うツールが見つかりませんでした"
          showAlternativeCounts
          alternativeCounts={alternativeCounts}
        />
      </div>
    </>
  );
}

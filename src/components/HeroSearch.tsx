'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Tool } from '@/types';

interface HeroSearchProps {
  tools: Tool[];
}

export default function HeroSearch({ tools }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = tools
      .filter(
        (tool) =>
          tool.name.toLowerCase().includes(lower) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(lower))
      )
      .slice(0, 8);
    setResults(filtered);
    setOpen(filtered.length > 0);
    setActiveIndex(-1);
  }, [query, tools]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = (slug: string) => {
    setOpen(false);
    setQuery('');
    router.push(`/tools/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      navigate(results[activeIndex].slug);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-white rounded-xl shadow-lg px-4 py-3">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="AIツールを検索... (例: ChatGPT, Midjourney)"
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm focus:outline-none"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); }}
            className="text-gray-400 hover:text-gray-600 ml-2"
            aria-label="クリア"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {results.map((tool, i) => (
            <li key={tool.slug}>
              <button
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${i === activeIndex ? 'bg-gray-50' : ''}`}
                onMouseDown={() => navigate(tool.slug)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{tool.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-md">{tool.shortDescription}</p>
                </div>
                <span className="ml-auto text-xs text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full flex-shrink-0">
                  {tool.category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

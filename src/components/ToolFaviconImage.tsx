'use client';
import { useState } from 'react';
import { Tool } from '@/types';

const gradientColors: Record<string, string> = {
  chatgpt: 'from-emerald-400 to-teal-600',
  claude: 'from-orange-400 to-amber-600',
  gemini: 'from-blue-400 to-indigo-600',
  midjourney: 'from-violet-400 to-purple-700',
  'stable-diffusion': 'from-pink-400 to-rose-600',
  'dall-e': 'from-cyan-400 to-sky-600',
  'github-copilot': 'from-gray-700 to-gray-900',
  cursor: 'from-indigo-400 to-violet-600',
  tabnine: 'from-blue-500 to-cyan-600',
  runway: 'from-red-400 to-pink-600',
  descript: 'from-green-400 to-emerald-600',
  pika: 'from-yellow-400 to-orange-500',
  suno: 'from-purple-400 to-fuchsia-600',
  elevenlabs: 'from-orange-400 to-red-600',
  udio: 'from-teal-400 to-cyan-600',
  jasper: 'from-rose-400 to-pink-600',
  'copy-ai': 'from-violet-400 to-indigo-600',
  'notion-ai': 'from-gray-400 to-slate-600',
  perplexity: 'from-sky-400 to-blue-600',
  'adobe-firefly': 'from-red-400 to-orange-600',
};

export default function ToolFaviconImage({ tool }: { tool: Tool }) {
  const [error, setError] = useState(false);

  const domain = (() => {
    try { return new URL(tool.officialUrl).hostname; } catch { return ''; }
  })();

  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : '';
  const gradient = gradientColors[tool.slug] || 'from-indigo-400 to-indigo-600';
  const initials = tool.name
    .split(/[\s.]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
      {!error && faviconUrl ? (
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={faviconUrl}
            alt={tool.name}
            className="w-12 h-12 object-contain rounded-lg"
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <span className="text-2xl font-bold text-white select-none">{initials}</span>
      )}
    </div>
  );
}

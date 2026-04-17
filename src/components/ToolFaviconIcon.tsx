'use client';
import { useState } from 'react';

interface Props {
  officialUrl: string;
  name: string;
  imgClassName?: string;
}

export default function ToolFaviconIcon({ officialUrl, name, imgClassName }: Props) {
  const [error, setError] = useState(false);

  const domain = (() => {
    try { return new URL(officialUrl).hostname; } catch { return ''; }
  })();

  if (!domain || error) {
    return (
      <span className="text-2xl font-bold text-white select-none">
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={name}
      className={imgClassName ?? 'w-12 h-12 object-contain rounded-lg'}
      onError={() => setError(true)}
    />
  );
}

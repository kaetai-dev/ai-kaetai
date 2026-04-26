'use client';

import { useEffect, useRef } from 'react';

interface GoogleAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAd({ slot, format = 'auto', responsive = true, className = '' }: GoogleAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || '';
  if (!publisherId) return null;

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

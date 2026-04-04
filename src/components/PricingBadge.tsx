import { Tool } from '@/types';

interface PricingBadgeProps {
  pricing: Tool['pricing'];
  size?: 'sm' | 'md';
}

const pricingConfig = {
  free: {
    label: '無料',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  freemium: {
    label: 'フリーミアム',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  },
  paid: {
    label: '有料',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  },
};

export default function PricingBadge({ pricing, size = 'sm' }: PricingBadgeProps) {
  const config = pricingConfig[pricing];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${config.className}`}
    >
      {config.label}
    </span>
  );
}

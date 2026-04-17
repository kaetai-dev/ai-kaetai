import {
  PenTool, Palette, Video, Music, Code, MessageCircle,
  BarChart3, Briefcase, Layers, Database,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const categoryIconMap: Record<string, LucideIcon> = {
  PenTool,
  Palette,
  Video,
  Music,
  Code,
  MessageCircle,
  BarChart3,
  Briefcase,
  Layers,
  Database,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return categoryIconMap[iconName] ?? Layers;
}

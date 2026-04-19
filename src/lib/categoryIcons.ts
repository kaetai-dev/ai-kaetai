import {
  PenTool, Palette, Video, Music, Code, MessageCircle,
  BarChart3, Briefcase, Layers, Database,
  Languages, Presentation, Clock,
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
  Languages,
  Presentation,
  Clock,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return categoryIconMap[iconName] ?? Layers;
}

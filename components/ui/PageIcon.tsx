import {
  Atom,
  Bot,
  Braces,
  Brain,
  Cloud,
  Database,
  FileCode2,
  Globe,
  Layers,
  LayoutTemplate,
  MapPin,
  MessageSquare,
  Plug,
  Rocket,
  Search,
  Server,
  Sparkles,
  Terminal,
  Triangle,
  UserRound,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/content";

const icons: Record<IconName, LucideIcon> = {
  atom: Atom,
  triangle: Triangle,
  server: Server,
  layers: Layers,
  layout: LayoutTemplate,
  database: Database,
  "file-code": FileCode2,
  braces: Braces,
  terminal: Terminal,
  brain: Brain,
  sparkles: Sparkles,
  "message-square": MessageSquare,
  search: Search,
  cloud: Cloud,
  rocket: Rocket,
  zap: Zap,
  globe: Globe,
  plug: Plug,
  bot: Bot,
  "user-round": UserRound,
  workflow: Workflow,
  "map-pin": MapPin,
};

export function PageIcon({
  name,
  className = "size-[18px]",
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />;
}

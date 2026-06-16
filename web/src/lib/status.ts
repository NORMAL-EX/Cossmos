import type { BadgeProps } from "@/components/ui/badge";
import type { Status } from "./types";

export interface StatusMeta {
  /** i18n key under status.* */
  labelKey: string;
  /** solid background utility for dots/bars */
  dot: string;
  /** Badge variant for this status */
  badge: NonNullable<BadgeProps["variant"]>;
  /** CSS color used for the pulsing halo */
  ring: string;
}

export const statusMeta: Record<Status, StatusMeta> = {
  up: {
    labelKey: "status.up",
    dot: "bg-success",
    badge: "success",
    ring: "var(--success)",
  },
  degraded: {
    labelKey: "status.degraded",
    dot: "bg-warning",
    badge: "warning",
    ring: "var(--warning)",
  },
  down: {
    labelKey: "status.down",
    dot: "bg-destructive",
    badge: "destructive",
    ring: "var(--destructive)",
  },
  pending: {
    labelKey: "status.pending",
    dot: "bg-muted-foreground",
    badge: "muted",
    ring: "var(--muted-foreground)",
  },
};

/** overallMessageKey maps the overall status to its hero headline key. */
export function overallMessageKey(status: Status): string {
  switch (status) {
    case "up":
      return "overall.up";
    case "degraded":
      return "overall.degraded";
    case "down":
      return "overall.down";
    default:
      return "overall.pending";
  }
}

import { Activity, Gauge, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StatusDot } from "./StatusDot";
import { UptimeBars } from "./UptimeBars";
import { useI18n } from "@/contexts/i18n";
import { formatMs, formatPercent } from "@/lib/format";
import { statusMeta } from "@/lib/status";
import type { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  const { t } = useI18n();
  const meta = statusMeta[service.status];
  const hasIssue = service.status === "down" || service.status === "degraded";
  const subtitle = service.description || service.url;

  return (
    <Card className="gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <StatusDot status={service.status} pulse={hasIssue} className="mt-1.5" />
            <div className="min-w-0">
              <h3 className="truncate font-medium leading-tight">{service.name}</h3>
              {subtitle && (
                <p
                  className="truncate text-xs text-muted-foreground"
                  title={service.url}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <Badge variant={meta.badge} className="shrink-0">
            {t(meta.labelKey)}
          </Badge>
        </div>

        {hasIssue && service.message && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="size-3.5 shrink-0" />
            <span className="truncate">{service.message}</span>
          </p>
        )}

        <UptimeBars history={service.history} max={service.history.length > 60 ? 90 : 60} />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Activity className="size-3.5" />
            {t("service.uptime")}
            <b className="font-semibold tabular-nums text-foreground">
              {formatPercent(service.uptime)}
            </b>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5" />
            {t("service.response")}
            <b className="font-semibold tabular-nums text-foreground">
              {formatMs(service.responseMs)}
            </b>
          </span>
        </div>
      </div>
    </Card>
  );
}

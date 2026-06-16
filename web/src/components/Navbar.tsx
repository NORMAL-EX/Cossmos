import { Activity } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import { SettingsMenu } from "./SettingsMenu";

export function Navbar({ title, github }: { title: string; github?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-card shadow-sm">
            <Activity className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight sm:text-base">
              {title}
            </p>
            <p className="text-[11px] leading-tight text-muted-foreground">
              Cossmos · Status
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SettingsMenu github={github} />
        </div>
      </div>
    </header>
  );
}

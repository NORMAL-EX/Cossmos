import { Activity, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeMenu } from "./ThemeMenu";
import { LangMenu } from "./LangMenu";

export function Navbar({ title, github }: { title: string; github?: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-card shadow-xs">
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

        <div className="flex flex-1 items-center justify-end gap-2">
          {github && (
            <Button
              variant="outline"
              size="sm"
              className="button-header hidden rounded-lg sm:inline-flex"
              render={<a href={github} target="_blank" rel="noreferrer" />}
            >
              <Github className="size-4" />
              GitHub
            </Button>
          )}
          <LangMenu />
          <ThemeMenu />
        </div>
      </div>
    </header>
  );
}

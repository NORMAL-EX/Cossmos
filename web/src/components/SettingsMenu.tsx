import { Github, Languages, Monitor, Moon, Settings2, Sun, SunMoon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, type Theme } from "@/contexts/theme";
import { useI18n, type Lang } from "@/contexts/i18n";
import { cn } from "@/lib/utils";

/** The popup settings menu: theme + language switcher and a source link. */
export function SettingsMenu({ github }: { github?: string }) {
  const { theme, setTheme } = useTheme();
  const { t, lang, setLang } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("menu.settings")}
        title={t("menu.settings")}
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <Settings2 className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <SunMoon className="size-3.5" />
          {t("menu.theme")}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as Theme)}
        >
          <DropdownMenuRadioItem value="light">
            <Sun className="size-4 text-muted-foreground" />
            {t("theme.light")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="size-4 text-muted-foreground" />
            {t("theme.dark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Monitor className="size-4 text-muted-foreground" />
            {t("theme.system")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex items-center gap-2">
          <Languages className="size-3.5" />
          {t("menu.language")}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={(value) => setLang(value as Lang)}
        >
          <DropdownMenuRadioItem value="zh">简体中文</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        {github && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLinkItem href={github} target="_blank" rel="noreferrer">
              <Github className="size-4 text-muted-foreground" />
              GitHub
            </DropdownMenuLinkItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

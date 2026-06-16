import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme";
import { useI18n } from "@/contexts/i18n";

/** Outline icon button that crossfades a sun/moon to flip between light & dark. */
export function ThemeToggle() {
  const { toggle } = useTheme();
  const { t } = useI18n();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={t("theme.toggle")}
      title={t("theme.toggle")}
      className="relative overflow-hidden"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

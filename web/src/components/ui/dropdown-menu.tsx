import * as React from "react";
import { Menu } from "@base-ui/react/menu";

import { cn } from "@/lib/utils";

// A shadcn-shaped wrapper around Base UI's accessible Menu — this is the popup
// menu used for the settings / theme / language switcher.
const DropdownMenu = Menu.Root;
const DropdownMenuTrigger = Menu.Trigger;
const DropdownMenuGroup = Menu.Group;
const DropdownMenuRadioGroup = Menu.RadioGroup;
const DropdownMenuPortal = Menu.Portal;

const itemClasses =
  "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

function DropdownMenuContent({
  className,
  sideOffset = 8,
  align = "end",
  ...props
}: React.ComponentProps<typeof Menu.Popup> & {
  sideOffset?: number;
  align?: "start" | "center" | "end";
}) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        sideOffset={sideOffset}
        align={align}
        className="z-50 outline-none"
      >
        <Menu.Popup
          className={cn(
            "min-w-[12rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg shadow-black/[0.04]",
            "origin-top transition-[opacity,transform] duration-150 ease-out",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof Menu.Item> & { inset?: boolean }) {
  return (
    <Menu.Item
      className={cn(itemClasses, inset && "pl-8", className)}
      {...props}
    />
  );
}

function DropdownMenuLinkItem({
  className,
  ...props
}: React.ComponentProps<typeof Menu.LinkItem>) {
  return <Menu.LinkItem className={cn(itemClasses, className)} {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.RadioItem>) {
  return (
    <Menu.RadioItem className={cn(itemClasses, "pl-8", className)} {...props}>
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <Menu.RadioItemIndicator>
          <span className="size-1.5 rounded-full bg-current" />
        </Menu.RadioItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Separator>) {
  return (
    <Menu.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
};

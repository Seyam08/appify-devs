"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
}

export function Topbar({ onToggleSidebar, onToggleMobile }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-2">
        <Button size="icon-sm" variant="outline" className="lg:hidden" onClick={onToggleMobile}>
          <Menu className="size-4" />
        </Button>
        <Button size="icon-sm" variant="outline" className="hidden lg:inline-flex" onClick={onToggleSidebar}>
          <Menu className="size-4" />
        </Button>
        <h1 className="text-base font-semibold lg:text-lg">Admin Analytics Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button size="icon-sm" variant="ghost" className="relative">
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-500" />
        </Button>
        <button className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm hover:bg-muted" type="button">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-medium text-white">AD</span>
          <span className="hidden sm:inline">Admin User</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

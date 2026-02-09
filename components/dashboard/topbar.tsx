"use client";

import { Bell, ChevronDown, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
}

export function TopBar({ collapsed, onToggleCollapse, onOpenMobile }: TopBarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={onOpenMobile}>
          <Menu className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="hidden md:flex" onClick={onToggleCollapse}>
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
        <h1 className="text-lg font-semibold">Admin Analytics Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
        </Button>

        <button className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition hover:bg-muted">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            AD
          </div>
          <span className="hidden text-sm md:block">Admin User</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

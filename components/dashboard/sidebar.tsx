"use client";

import { BarChart3, Home, Settings, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Overview", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: Settings, label: "Settings" },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-70 flex-col border-r bg-card px-3 py-5 transition-transform duration-300 lg:translate-x-0",
          collapsed ? "lg:w-20" : "lg:w-70",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <p className={cn("text-lg font-semibold", collapsed && "lg:hidden")}>Appify Admin</p>
          <Button size="icon-sm" variant="ghost" className="lg:hidden" onClick={onCloseMobile}>
            <X className="size-4" />
          </Button>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                active && "bg-primary/10 text-primary",
                collapsed && "lg:justify-center"
              )}
              type="button"
            >
              <Icon className="size-4" />
              <span className={cn(collapsed && "lg:hidden")}>{label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-black/25 lg:hidden" type="button" onClick={onCloseMobile} aria-label="Close menu" />}
    </>
  );
}

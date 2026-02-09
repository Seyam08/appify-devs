"use client";

import { BarChart3, LayoutDashboard, Settings, Users2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Analytics", icon: BarChart3 },
  { label: "Users", icon: Users2 },
  { label: "Settings", icon: Settings },
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
          "hidden border-r bg-sidebar p-4 md:block transition-all duration-300",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <p className="mb-8 px-2 text-lg font-semibold">{collapsed ? "AD" : "Appify Admin"}</p>
        <nav className="space-y-2">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent",
                active && "bg-accent text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <aside className="h-full w-72 bg-sidebar p-4">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-lg font-semibold">Appify Admin</p>
              <Button variant="ghost" size="icon-sm" onClick={onCloseMobile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="space-y-2">
              {navItems.map(({ label, icon: Icon, active }) => (
                <button
                  key={label}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent",
                    active && "bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

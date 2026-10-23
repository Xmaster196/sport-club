"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/schedule", label: "Расписание" },
  { href: "/trainers", label: "Тренеры" },
  { href: "/clubs", label: "Клубы" },
  { href: "/pricing", label: "Цены" },
  { href: "/account", label: "Личный кабинет" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="ml-auto hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Открыть меню"
        aria-expanded={open}
        className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-14 z-50 border-b bg-background/95 backdrop-blur-md md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

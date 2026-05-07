import { Link } from "@tanstack/react-router";
import { Menu, TrainFront, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/providers/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/schedule", label: "Schedule" },
  { to: "/booking", label: "Book" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass-strong flex h-14 items-center justify-between rounded-full px-3 pl-5 shadow-lg">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-8 w-8 place-items-center rounded-full gradient-bg shadow-glow">
              <TrainFront className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Rail<span className="gradient-text">Nova</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="rounded-full px-3.5 py-1.5 text-sm transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/booking"
              className="hidden sm:inline-flex h-9 items-center rounded-full gradient-bg px-4 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-95 transition"
            >
              Book Now
            </Link>
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full glass"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { TrainFront, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full gradient-bg shadow-glow">
              <TrainFront className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold">Rail<span className="gradient-text">Nova</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The next-generation railway terminal. Real-time, beautifully built.
          </p>
          <div className="flex gap-2 pt-2">
            {[Twitter, Github, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full glass hover:shadow-glow">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-medium mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/schedule" className="hover:text-foreground">Schedule</Link></li>
            <li><Link to="/booking" className="hover:text-foreground">Book a ticket</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Station</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Aurora Central, Platform Plaza</li>
            <li>+1 (555) 014-7700</li>
            <li>hello@railnova.app</li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Newsletter</div>
          <p className="text-sm text-muted-foreground mb-3">Trip alerts and route launches.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full bg-secondary/60 px-4 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary"
            />
            <button className="rounded-full gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RailNova Terminal Co.
      </div>
    </footer>
  );
}

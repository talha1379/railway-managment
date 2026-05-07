import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const HeroScene = lazy(() => import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })));

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden -mt-24 pt-24">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 gradient-hero" />}>
          <HeroScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Now boarding — terminal v2.4
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[1.02]">
            Rails reimagined for the <span className="gradient-text">next century</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            RailNova is a fully responsive, real-time station experience — book seats,
            track trains, and manage operations from one beautifully crafted terminal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow"
            >
              Book a journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:shadow-glow-violet"
            >
              View schedule
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["180+", "Daily routes"],
              ["1.2M", "Riders / mo"],
              ["99.4%", "On-time rate"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-semibold gradient-text">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

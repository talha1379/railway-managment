import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Heart, Rocket, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — RailNova" },
      { name: "description", content: "Our story, mission and the team rebuilding railway terminals for the next century." },
    ],
  }),
});

const milestones = [
  { year: "2018", title: "First platform", desc: "RailNova opens as a single-line digital terminal in Aurora Central." },
  { year: "2020", title: "Network grew 4×", desc: "Connected ten cities and launched real-time platform alerts." },
  { year: "2022", title: "Sleeper service", desc: "Introduced overnight HighSpeed routes with full lounge access." },
  { year: "2024", title: "Smart booking", desc: "Visual seat picker and AI route suggestions roll out network-wide." },
  { year: "2026", title: "v2.4 terminal", desc: "A re-imagined web terminal — the one you're using right now." },
];

const team = [
  { name: "Lena Hoffmann", role: "Director of Operations", initials: "LH" },
  { name: "Diego Romero", role: "Head of Engineering", initials: "DR" },
  { name: "Aiko Tanaka", role: "Lead Designer", initials: "AT" },
  { name: "Omar Khalil", role: "Customer Experience", initials: "OK" },
];

function AboutPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary mb-2">About</div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
              We build the rails for the <span className="gradient-text">next century</span> of travel.
            </h1>
            <p className="mt-6 text-muted-foreground max-w-xl">
              RailNova is a small team of engineers, designers and operators on a mission to make
              every railway terminal feel as effortless as the destinations they serve.
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl glass-strong p-8 grid grid-cols-2 gap-4">
            {[
              { Icon: Rocket, label: "Mission", text: "Effortless travel" },
              { Icon: Heart, label: "Values", text: "Riders first" },
              { Icon: Users, label: "Team", text: "32 people" },
              { Icon: Award, label: "Awards", text: "Best UX 2025" },
            ].map(({ Icon, label, text }) => (
              <div key={label} className="rounded-2xl glass p-5 flex flex-col justify-between">
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-display">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid sm:grid-cols-4 gap-6">
          {[
            ["32", "Team members"],
            ["180+", "Routes"],
            ["1.2M", "Monthly riders"],
            ["99.4%", "On-time"],
          ].map(([v, l]) => <Counter key={l as string} value={v as string} label={l as string} />)}
        </div>

        <div className="mt-24">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Timeline</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">The platforms we've built.</h2>
          <div className="relative pl-6 sm:pl-12">
            <div className="absolute left-2 sm:left-5 top-0 bottom-0 w-px bg-border" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pb-10 last:pb-0"
              >
                <div className="absolute -left-[calc(0.375rem+1px)] sm:-left-[calc(0.875rem+1px)] top-1.5 h-3 w-3 rounded-full gradient-bg shadow-glow" />
                <div className="text-xs text-primary font-medium mb-1">{m.year}</div>
                <div className="font-display text-xl">{m.title}</div>
                <div className="text-sm text-muted-foreground mt-1 max-w-xl">{m.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Team</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">The people behind the platform.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.name} className="glass rounded-3xl p-6 text-center">
                <div className="grid h-20 w-20 mx-auto place-items-center rounded-full gradient-bg text-xl font-display font-semibold text-primary-foreground shadow-glow">{t.initials}</div>
                <div className="mt-4 font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^\d.]/g, ""));
    const suffix = value.replace(/[\d.]/g, "");
    let start = 0; const dur = 1200; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = num * eased;
      setN((Number.isInteger(num) ? Math.round(cur) : cur.toFixed(1)) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (
    <div ref={ref} className="glass rounded-3xl p-6 text-center">
      <div className="font-display text-4xl gradient-text">{n}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

import { trains, type Status } from "@/data/mock";
import { motion } from "framer-motion";
import { Clock, MapPin, Train } from "lucide-react";

const statusStyles: Record<Status, string> = {
  "on-time": "bg-success/15 text-[oklch(0.85_0.18_155)] ring-1 ring-success/40",
  "boarding": "bg-primary/15 text-primary ring-1 ring-primary/40 animate-pulse-glow",
  "delayed": "bg-warning/15 text-[oklch(0.88_0.17_75)] ring-1 ring-warning/40",
  "departed": "bg-muted text-muted-foreground ring-1 ring-border",
  "cancelled": "bg-destructive/15 text-[oklch(0.78_0.2_27)] ring-1 ring-destructive/40",
};

export function LiveStatus() {
  const live = trains.slice(0, 6);
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Live board</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Now departing</h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Updated just now
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {live.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass rounded-2xl p-5 hover:shadow-glow transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg shadow-glow">
                  <Train className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.number} · {t.type}</div>
                </div>
              </div>
              <span className={`text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1 ${statusStyles[t.status]}`}>
                {t.status.replace("-", " ")}
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <div>
                <div className="font-display text-xl">{t.departure}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" />{t.from}</div>
              </div>
              <div className="flex-1 mx-3 border-t border-dashed border-border relative">
                <Clock className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-4 text-muted-foreground bg-background px-0.5" />
              </div>
              <div className="text-right">
                <div className="font-display text-xl">{t.arrival}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 justify-end"><MapPin className="h-3 w-3" />{t.to}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Platform <span className="text-foreground font-medium">{t.platform}</span></span>
              <span className="font-medium">${t.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

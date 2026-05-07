import { popularRoutes } from "@/data/mock";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function PopularRoutes() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Popular</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Routes our riders love.</h2>
        </div>
        <Link to="/schedule" className="hidden sm:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {popularRoutes.map((r, i) => (
          <motion.div
            key={r.from + r.to}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-3xl glass p-5 hover:-translate-y-1 transition-transform"
          >
            <div className={`h-32 rounded-2xl bg-gradient-to-br ${r.image} mb-4 grid place-items-center`}>
              <div className="font-display text-3xl text-foreground/80">{r.duration}</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{r.from}</div>
                <div className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                  <ArrowRight className="h-3 w-3" /> {r.to}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-lg gradient-text">${r.price}</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end"><Clock className="h-3 w-3" />{r.duration}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

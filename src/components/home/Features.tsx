import { features } from "@/data/mock";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl mb-12">
        <div className="text-xs uppercase tracking-widest text-primary mb-2">Why RailNova</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold">Everything a modern terminal should be.</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = (Icons as any)[f.icon] ?? Icons.Sparkles;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl glass p-6 hover:shadow-glow-violet transition-shadow"
            >
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full gradient-bg opacity-10 blur-3xl group-hover:opacity-25 transition-opacity" />
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-bg shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

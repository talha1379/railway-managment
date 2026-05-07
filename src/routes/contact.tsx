import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { faqs } from "@/data/mock";
import { ChevronDown, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — RailNova" },
      { name: "description", content: "Reach the RailNova terminal team — phone, email, and FAQs." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Contact</div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold">We'd love to hear from you.</h1>
          <p className="mt-3 text-muted-foreground">Questions, partnerships or feedback — choose the channel that suits you best.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="space-y-4">
            {[
              { Icon: MapPin, label: "Visit", value: "Aurora Central, Platform Plaza, Bay 12" },
              { Icon: Phone, label: "Call", value: "+1 (555) 014-7700" },
              { Icon: Mail, label: "Email", value: "hello@railnova.app" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-5 flex gap-4 items-start">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg shadow-glow"><Icon className="h-4 w-4 text-primary-foreground" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-medium">{value}</div>
                </div>
              </div>
            ))}
            <div className="rounded-2xl overflow-hidden glass aspect-video">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1419%2C51.5054%2C-0.1130%2C51.5210&layer=mapnik"
                className="w-full h-full"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); }}
            className="glass-strong rounded-3xl p-6"
          >
            <h2 className="font-display text-xl mb-5">Send a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="you@example.com" />
            </div>
            <div className="mt-4">
              <Input label="Subject" placeholder="How can we help?" />
            </div>
            <div className="mt-4">
              <label className="block">
                <div className="text-xs text-muted-foreground mb-1.5">Message</div>
                <textarea rows={6} placeholder="Tell us more..." className="w-full rounded-xl bg-secondary/50 px-4 py-3 ring-1 ring-border focus:ring-primary outline-none resize-none" />
              </label>
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">
              <Send className="h-4 w-4" /> {sent ? "Sent — thanks!" : "Send message"}
            </button>
          </form>
        </div>

        <div className="mt-24">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">FAQ</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">Common questions.</h2>
          <div className="grid gap-3 max-w-3xl">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Input({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      <input type={type} placeholder={placeholder} className="w-full rounded-xl bg-secondary/50 px-4 py-3 ring-1 ring-border focus:ring-primary outline-none" />
    </label>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

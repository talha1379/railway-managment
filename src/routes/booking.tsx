import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { trains } from "@/data/mock";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, CreditCard, ShieldCheck, Sparkles, Wallet } from "lucide-react";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Book a journey — RailNova" },
      { name: "description", content: "Book train tickets in seconds with our visual seat picker." },
    ],
  }),
});

const classes = [
  { id: "standard", label: "Standard", price: 0 },
  { id: "comfort", label: "Comfort", price: 25 },
  { id: "first", label: "First class", price: 60 },
] as const;

const seats = Array.from({ length: 32 }).map((_, i) => ({
  id: i,
  label: `${["A", "B", "C", "D"][i % 4]}${Math.floor(i / 4) + 1}`,
  taken: [3, 7, 12, 19, 22, 28].includes(i),
}));

function BookingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trainId, setTrainId] = useState(trains[0].id);
  const [klass, setKlass] = useState<typeof classes[number]["id"]>("standard");
  const [seat, setSeat] = useState<number | null>(null);
  const [pay, setPay] = useState<"card" | "wallet">("card");
  const [done, setDone] = useState(false);

  const train = useMemo(() => trains.find(t => t.id === trainId)!, [trainId]);
  const total = train.price + (classes.find(c => c.id === klass)?.price ?? 0);
  const stepNames = ["Passenger", "Train & Seat", "Payment", "Review"];

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <PublicLayout>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Booking</div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold">Reserve your journey.</h1>
        </div>

        <div className="mb-8 flex items-center gap-2 flex-wrap">
          {stepNames.map((n, i) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs ${i <= step ? "gradient-bg text-primary-foreground shadow-glow" : "glass text-muted-foreground"}`}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-background/30 text-[10px]">{i + 1}</span>{n}
              </div>
              {i < stepNames.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="glass-strong rounded-3xl p-6 min-h-[420px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-xl mb-5">Passenger details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Full name" value={name} onChange={setName} placeholder="Aiko Tanaka" />
                    <Input label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
                    <Input label="Phone" value={phone} onChange={setPhone} placeholder="+1 555 0100" />
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-xl mb-5">Train & seat</h2>
                  <label className="block mb-4">
                    <div className="text-xs text-muted-foreground mb-1.5">Train</div>
                    <select value={trainId} onChange={(e) => setTrainId(e.target.value)} className="w-full rounded-xl bg-secondary/50 px-4 py-3 ring-1 ring-border">
                      {trains.map(t => <option key={t.id} value={t.id}>{t.name} — {t.from} → {t.to} · ${t.price}</option>)}
                    </select>
                  </label>
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Class</div>
                    <div className="flex flex-wrap gap-2">
                      {classes.map(c => (
                        <button key={c.id} onClick={() => setKlass(c.id)} className={`rounded-full px-4 py-2 text-sm ${klass === c.id ? "gradient-bg text-primary-foreground shadow-glow" : "glass"}`}>
                          {c.label}{c.price > 0 && ` +$${c.price}`}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Pick a seat</div>
                    <div className="grid grid-cols-8 gap-2 max-w-md">
                      {seats.map(s => (
                        <button
                          key={s.id}
                          disabled={s.taken}
                          onClick={() => setSeat(s.id)}
                          className={`aspect-square rounded-lg text-[11px] font-medium transition
                            ${s.taken ? "bg-muted text-muted-foreground/50 cursor-not-allowed" :
                              seat === s.id ? "gradient-bg text-primary-foreground shadow-glow" :
                                "glass hover:shadow-glow"}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded gradient-bg" /> Selected</span>
                      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded glass" /> Available</span>
                      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-muted" /> Taken</span>
                    </div>
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-xl mb-5">Payment</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { id: "card", icon: CreditCard, label: "Credit card", desc: "Visa, MC, Amex" },
                      { id: "wallet", icon: Wallet, label: "Wallet", desc: "Apple / Google Pay" },
                    ].map(o => (
                      <button key={o.id} onClick={() => setPay(o.id as any)} className={`text-left rounded-2xl p-5 transition ${pay === o.id ? "ring-2 ring-primary shadow-glow gradient-bg/10" : "glass hover:shadow-glow"}`}>
                        <o.icon className="h-5 w-5 text-primary mb-2" />
                        <div className="font-medium">{o.label}</div>
                        <div className="text-xs text-muted-foreground">{o.desc}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Input label="Card number" value="" onChange={() => {}} placeholder="4242 4242 4242 4242" />
                    <Input label="Name on card" value="" onChange={() => {}} placeholder="A. Tanaka" />
                    <Input label="Expiry" value="" onChange={() => {}} placeholder="MM/YY" />
                    <Input label="CVC" value="" onChange={() => {}} placeholder="123" />
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-success" /> Bank-grade encryption
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-xl mb-5">Review & confirm</h2>
                  <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <Row k="Passenger" v={name || "—"} />
                    <Row k="Email" v={email || "—"} />
                    <Row k="Train" v={`${train.name} (${train.number})`} />
                    <Row k="Route" v={`${train.from} → ${train.to}`} />
                    <Row k="Departs" v={train.departure} />
                    <Row k="Class" v={classes.find(c => c.id === klass)!.label} />
                    <Row k="Seat" v={seat != null ? seats[seat].label : "—"} />
                    <Row k="Payment" v={pay === "card" ? "Credit card" : "Wallet"} />
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <button onClick={prev} disabled={step === 0} className="rounded-full glass px-5 py-2.5 text-sm disabled:opacity-40">Back</button>
              {step < 3 ? (
                <button onClick={next} className="rounded-full gradient-bg px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">Continue</button>
              ) : (
                <button onClick={() => setDone(true)} className="rounded-full gradient-bg px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">Confirm booking</button>
              )}
            </div>
          </div>

          <aside className="glass rounded-3xl p-6 h-fit sticky top-28">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Summary</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Train</span><span className="font-medium">{train.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span>{train.from} → {train.to}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Departs</span><span className="font-display">{train.departure}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Class</span><span>{classes.find(c => c.id === klass)!.label}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Seat</span><span>{seat != null ? seats[seat].label : "—"}</span></div>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-2xl gradient-text">${total}</span>
            </div>
          </aside>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-sm p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="glass-strong rounded-3xl p-8 max-w-md text-center shadow-glow">
                <div className="grid h-14 w-14 place-items-center rounded-full gradient-bg mx-auto shadow-glow">
                  <Check className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl mt-4">Booking confirmed</h3>
                <p className="mt-2 text-sm text-muted-foreground">Your e-ticket has been sent to {email || "your inbox"}. Have a smooth journey aboard {train.name}.</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary"><Sparkles className="h-3.5 w-3.5" /> Confirmation #{Math.floor(Math.random() * 9e6) + 1e6}</div>
                <button onClick={() => { setDone(false); setStep(0); }} className="mt-6 w-full rounded-full gradient-bg px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">Done</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PublicLayout>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl bg-secondary/50 px-4 py-3 ring-1 ring-border focus:ring-primary outline-none" />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/40 pb-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}

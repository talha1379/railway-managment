import { stations } from "@/data/mock";
import { ArrowRightLeft, CalendarDays, Search, Users } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function SearchForm() {
  const navigate = useNavigate();
  const [from, setFrom] = useState(stations[0]);
  const [to, setTo] = useState(stations[3]);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [pax, setPax] = useState(1);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <section className="relative mx-auto max-w-7xl px-6">
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/schedule" }); }}
        className="glass-strong rounded-3xl p-4 md:p-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_1fr_auto_auto] items-end shadow-glow"
      >
        <Field label="From">
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="input">
            {stations.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <button type="button" onClick={swap} className="hidden md:grid h-10 w-10 place-items-center rounded-full glass mb-1 hover:shadow-glow">
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <Field label="To">
          <select value={to} onChange={(e) => setTo(e.target.value)} className="input">
            {stations.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Date" icon={<CalendarDays className="h-4 w-4" />}>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
        </Field>
        <Field label="Passengers" icon={<Users className="h-4 w-4" />}>
          <input type="number" min={1} max={9} value={pax} onChange={(e) => setPax(+e.target.value)} className="input w-24" />
        </Field>
        <button className="inline-flex h-12 items-center gap-2 rounded-2xl gradient-bg px-6 text-sm font-medium text-primary-foreground shadow-glow">
          <Search className="h-4 w-4" /> Search
        </button>
      </form>
      <style>{`.input{background:transparent;outline:none;width:100%;font-size:0.95rem;color:var(--color-foreground)}`}</style>
    </section>
  );
}

function Field({ label, children, icon }: { label: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <label className="block rounded-2xl bg-secondary/50 px-4 py-2.5 ring-1 ring-border focus-within:ring-primary transition">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">{icon}{label}</div>
      {children}
    </label>
  );
}

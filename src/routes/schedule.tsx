import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { trains, stations, type Status } from "@/data/mock";
import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";

export const Route = createFileRoute("/schedule")({
  component: SchedulePage,
  head: () => ({
    meta: [
      { title: "Schedule — RailNova" },
      { name: "description", content: "Search live train schedules across the RailNova network." },
    ],
  }),
});

const statusStyles: Record<Status, string> = {
  "on-time": "bg-success/15 text-[oklch(0.85_0.18_155)] ring-1 ring-success/30",
  "boarding": "bg-primary/15 text-primary ring-1 ring-primary/40",
  "delayed": "bg-warning/15 text-[oklch(0.88_0.17_75)] ring-1 ring-warning/40",
  "departed": "bg-muted text-muted-foreground ring-1 ring-border",
  "cancelled": "bg-destructive/15 text-[oklch(0.78_0.2_27)] ring-1 ring-destructive/40",
};

function SchedulePage() {
  const [dest, setDest] = useState("All");
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() =>
    trains.filter(t =>
      (dest === "All" || t.to === dest) &&
      (type === "All" || t.type === type) &&
      (q === "" || (t.name + t.number + t.from + t.to).toLowerCase().includes(q.toLowerCase()))
    ), [dest, type, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const view = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Schedule</div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold">Live train timetable.</h1>
          <p className="mt-3 text-muted-foreground">Filter by destination, type or search by name and number.</p>
        </div>

        <div className="glass-strong rounded-3xl p-4 grid gap-3 md:grid-cols-[1fr_1fr_2fr_auto] mb-6">
          <select value={dest} onChange={(e) => { setDest(e.target.value); setPage(1); }} className="rounded-xl bg-secondary/50 px-4 py-3 ring-1 ring-border">
            <option>All</option>
            {stations.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className="rounded-xl bg-secondary/50 px-4 py-3 ring-1 ring-border">
            <option>All</option>
            <option>HighSpeed</option><option>Express</option><option>Local</option><option>Sleeper</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search trains" className="w-full rounded-xl bg-secondary/50 pl-9 pr-4 py-3 ring-1 ring-border focus:ring-primary outline-none" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl glass px-4 text-sm text-muted-foreground"><Filter className="h-4 w-4" />{filtered.length} trains</div>
        </div>

        <div className="overflow-x-auto rounded-3xl glass">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground bg-gradient-to-r from-primary/10 via-accent/10 to-transparent">
                {["Train", "Route", "Departs", "Arrives", "Platform", "Type", "Price", "Status"].map(h => (
                  <th key={h} className="px-5 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {view.map(t => (
                <tr key={t.id} className="border-t border-border/60 hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.number}</div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{t.from} → {t.to}</td>
                  <td className="px-5 py-4 font-display">{t.departure}</td>
                  <td className="px-5 py-4 font-display">{t.arrival}</td>
                  <td className="px-5 py-4">{t.platform}</td>
                  <td className="px-5 py-4 text-muted-foreground">{t.type}</td>
                  <td className="px-5 py-4 font-medium">${t.price}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1 ${statusStyles[t.status]}`}>{t.status.replace("-", " ")}</span>
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-muted-foreground">No trains match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Page {page} of {pages}</div>
          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`h-9 w-9 rounded-full text-sm ${page === i + 1 ? "gradient-bg text-primary-foreground shadow-glow" : "glass hover:shadow-glow"}`}>{i + 1}</button>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

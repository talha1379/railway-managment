import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { passengers, stats, trains as initialTrains, type Train } from "@/data/mock";
import { Bell, ChartBar, LayoutDashboard, Plus, Search, Settings, Train as TrainIcon, Trash2, Users, X, Edit3, TrendingUp, DollarSign } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ThemeToggle } from "@/components/providers/ThemeToggle";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — RailNova" },
      { name: "description", content: "Manage trains, schedules, passengers, and station operations." },
    ],
  }),
});

const colors = ["oklch(0.82 0.17 200)", "oklch(0.65 0.22 295)", "oklch(0.75 0.18 155)", "oklch(0.82 0.17 75)"];

function AdminPage() {
  const [trains, setTrains] = useState<Train[]>(initialTrains);
  const [editing, setEditing] = useState<Train | null>(null);
  const [creating, setCreating] = useState(false);
  const [section, setSection] = useState<"overview" | "trains" | "passengers" | "settings">("overview");
  const [notifOpen, setNotifOpen] = useState(false);
  const [pq, setPq] = useState("");
  const [sortKey, setSortKey] = useState<keyof typeof passengers[number]>("date");

  const filteredPax = useMemo(() => {
    return [...passengers]
      .filter(p => (p.name + p.train + p.id).toLowerCase().includes(pq.toLowerCase()))
      .sort((a, b) => String(a[sortKey]).localeCompare(String(b[sortKey])));
  }, [pq, sortKey]);

  const totalRevenue = stats.weekly.reduce((s, d) => s + d.revenue, 0);
  const totalBookings = stats.weekly.reduce((s, d) => s + d.bookings, 0);
  const delays = trains.filter(t => t.status === "delayed").length;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/60 p-4 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2 px-2 py-2 mb-6">
          <span className="grid h-8 w-8 place-items-center rounded-full gradient-bg shadow-glow"><TrainIcon className="h-4 w-4 text-primary-foreground" /></span>
          <span className="font-display text-lg">Rail<span className="gradient-text">Nova</span></span>
        </Link>
        <nav className="space-y-1">
          {[
            { id: "overview", label: "Overview", Icon: LayoutDashboard },
            { id: "trains", label: "Trains", Icon: TrainIcon },
            { id: "passengers", label: "Passengers", Icon: Users },
            { id: "settings", label: "Settings", Icon: Settings },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id as any)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${section === id ? "gradient-bg text-primary-foreground shadow-glow" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </nav>
        <div className="mt-auto glass rounded-2xl p-4 text-xs text-muted-foreground">
          Logged in as <span className="text-foreground">admin@railnova.app</span>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="font-display text-lg capitalize">{section}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setNotifOpen(v => !v)} className="relative grid h-9 w-9 place-items-center rounded-full glass">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
              </button>
              <ThemeToggle />
            </div>
          </div>
          {notifOpen && (
            <div className="absolute right-6 top-16 w-80 glass-strong rounded-2xl p-3 shadow-glow">
              {[
                "SX-2401 platform changed to 3A",
                "12 new bookings in the last hour",
                "NC-1180 now boarding",
              ].map((n, i) => (
                <div key={i} className="rounded-xl px-3 py-2 hover:bg-secondary text-sm">{n}</div>
              ))}
            </div>
          )}
        </header>

        <div className="p-6 space-y-6">
          {section === "overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Active trains" value={trains.length.toString()} Icon={TrainIcon} />
                <Stat label="Bookings (wk)" value={totalBookings.toLocaleString()} Icon={Users} accent />
                <Stat label="Revenue (wk)" value={`$${(totalRevenue / 1000).toFixed(1)}k`} Icon={DollarSign} />
                <Stat label="Current delays" value={delays.toString()} Icon={TrendingUp} />
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2 glass rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg">Weekly performance</h3>
                    <ChartBar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer>
                      <BarChart data={stats.weekly}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
                        <XAxis dataKey="day" stroke="oklch(0.7 0.02 255)" fontSize={12} />
                        <YAxis stroke="oklch(0.7 0.02 255)" fontSize={12} />
                        <Tooltip contentStyle={{ background: "oklch(0.21 0.035 262)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                        <Bar dataKey="bookings" fill="oklch(0.82 0.17 200)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="glass rounded-3xl p-6">
                  <h3 className="font-display text-lg mb-4">Train mix</h3>
                  <div className="h-72">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={stats.byType} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={4}>
                          {stats.byType.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "oklch(0.21 0.035 262)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {stats.byType.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: colors[i] }} />{d.name} · {d.value}%</div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {section === "trains" && (
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">Manage schedules</h3>
                <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-full gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow"><Plus className="h-4 w-4" /> New train</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                      {["Number", "Name", "Route", "Departs", "Status", ""].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {trains.map(t => (
                      <tr key={t.id} className="border-t border-border/60 hover:bg-secondary/40">
                        <td className="px-4 py-3 font-mono text-xs">{t.number}</td>
                        <td className="px-4 py-3 font-medium">{t.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{t.from} → {t.to}</td>
                        <td className="px-4 py-3 font-display">{t.departure}</td>
                        <td className="px-4 py-3 capitalize">{t.status.replace("-", " ")}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => setEditing(t)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg glass mr-1"><Edit3 className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setTrains(trains.filter(x => x.id !== t.id))} className="inline-flex h-8 w-8 items-center justify-center rounded-lg glass text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === "passengers" && (
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <h3 className="font-display text-lg">Passengers</h3>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input value={pq} onChange={(e) => setPq(e.target.value)} placeholder="Search" className="rounded-xl bg-secondary/50 pl-9 pr-4 py-2.5 ring-1 ring-border outline-none focus:ring-primary text-sm" />
                  </div>
                  <select value={sortKey} onChange={(e) => setSortKey(e.target.value as any)} className="rounded-xl bg-secondary/50 px-3 py-2.5 ring-1 ring-border text-sm">
                    <option value="date">Sort: Date</option>
                    <option value="name">Sort: Name</option>
                    <option value="train">Sort: Train</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                      {["ID", "Name", "Train", "Seat", "Date", "Status"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPax.map(p => (
                      <tr key={p.id} className="border-t border-border/60 hover:bg-secondary/40">
                        <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                        <td className="px-4 py-3 font-medium">{p.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{p.train}</td>
                        <td className="px-4 py-3">{p.seat}</td>
                        <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                        <td className="px-4 py-3 capitalize">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === "settings" && (
            <div className="glass rounded-3xl p-6 max-w-xl">
              <h3 className="font-display text-lg mb-4">Settings</h3>
              <p className="text-sm text-muted-foreground">Theme and notification preferences. Demo only.</p>
              <div className="mt-4 flex items-center gap-3">
                <ThemeToggle /> <span className="text-sm">Toggle dark / light</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {(editing || creating) && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-3xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-lg">{editing ? "Edit train" : "New train"}</h4>
              <button onClick={() => { setEditing(null); setCreating(false); }} className="grid h-8 w-8 place-items-center rounded-full glass"><X className="h-4 w-4" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">In-memory demo — changes won't persist on reload.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => { setEditing(null); setCreating(false); }} className="rounded-full glass px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => {
                if (creating) {
                  const id = String(Date.now());
                  setTrains([...trains, { ...initialTrains[0], id, name: "New Train", number: "NX-" + Math.floor(Math.random() * 9000 + 1000) }]);
                }
                setEditing(null); setCreating(false);
              }} className="rounded-full gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, Icon, accent }: { label: string; value: string; Icon: any; accent?: boolean }) {
  return (
    <div className={`glass rounded-2xl p-5 ${accent ? "shadow-glow" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="font-display text-3xl mt-2">{value}</div>
    </div>
  );
}

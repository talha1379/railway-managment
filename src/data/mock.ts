export type Status = "on-time" | "delayed" | "boarding" | "departed" | "cancelled";

export interface Train {
  id: string;
  name: string;
  number: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  platform: string;
  status: Status;
  type: "Express" | "Local" | "HighSpeed" | "Sleeper";
  price: number;
}

export const stations = [
  "Aurora Central", "Nova Junction", "Crescent Bay", "Skyline Terminal",
  "Vermillion Park", "Iron Heights", "Solace Station", "Granite Hollow",
  "Phoenix West", "Marina Pier",
];

export const trains: Train[] = [
  { id: "1", name: "Skyline Express", number: "SX-2401", from: "Aurora Central", to: "Skyline Terminal", departure: "06:30", arrival: "09:15", platform: "3A", status: "on-time", type: "HighSpeed", price: 89 },
  { id: "2", name: "Nova Connector", number: "NC-1180", from: "Nova Junction", to: "Vermillion Park", departure: "07:05", arrival: "10:42", platform: "1B", status: "boarding", type: "Express", price: 54 },
  { id: "3", name: "Crescent Liner", number: "CL-3320", from: "Crescent Bay", to: "Marina Pier", departure: "07:45", arrival: "08:55", platform: "5", status: "delayed", type: "Local", price: 18 },
  { id: "4", name: "Iron Bullet", number: "IB-7711", from: "Iron Heights", to: "Phoenix West", departure: "08:10", arrival: "12:30", platform: "2", status: "on-time", type: "HighSpeed", price: 112 },
  { id: "5", name: "Solace Night", number: "SN-9009", from: "Solace Station", to: "Granite Hollow", departure: "22:00", arrival: "06:40", platform: "7", status: "on-time", type: "Sleeper", price: 145 },
  { id: "6", name: "Phoenix Arrow", number: "PA-4402", from: "Phoenix West", to: "Aurora Central", departure: "09:25", arrival: "13:05", platform: "4", status: "on-time", type: "Express", price: 76 },
  { id: "7", name: "Marina Coast", number: "MC-2245", from: "Marina Pier", to: "Crescent Bay", departure: "10:00", arrival: "11:20", platform: "6", status: "departed", type: "Local", price: 22 },
  { id: "8", name: "Vermillion Dash", number: "VD-5560", from: "Vermillion Park", to: "Nova Junction", departure: "11:15", arrival: "14:50", platform: "3B", status: "on-time", type: "Express", price: 58 },
  { id: "9", name: "Granite Local", number: "GL-1102", from: "Granite Hollow", to: "Solace Station", departure: "12:30", arrival: "13:55", platform: "1A", status: "delayed", type: "Local", price: 19 },
  { id: "10", name: "Aurora Star", number: "AS-8800", from: "Aurora Central", to: "Iron Heights", departure: "13:45", arrival: "17:20", platform: "2A", status: "on-time", type: "HighSpeed", price: 98 },
  { id: "11", name: "Skyline Sunset", number: "SX-2402", from: "Skyline Terminal", to: "Aurora Central", departure: "18:30", arrival: "21:15", platform: "3A", status: "on-time", type: "HighSpeed", price: 89 },
  { id: "12", name: "Nova Midnight", number: "NC-1199", from: "Nova Junction", to: "Phoenix West", departure: "23:50", arrival: "05:30", platform: "1B", status: "cancelled", type: "Sleeper", price: 132 },
];

export const popularRoutes = [
  { from: "Aurora Central", to: "Skyline Terminal", duration: "2h 45m", price: 89, image: "from-cyan-500/40 to-violet-500/40" },
  { from: "Iron Heights", to: "Phoenix West", duration: "4h 20m", price: 112, image: "from-violet-500/40 to-pink-500/40" },
  { from: "Solace Station", to: "Granite Hollow", duration: "8h 40m", price: 145, image: "from-emerald-500/40 to-cyan-500/40" },
  { from: "Nova Junction", to: "Vermillion Park", duration: "3h 37m", price: 54, image: "from-amber-500/40 to-rose-500/40" },
];

export const testimonials = [
  { name: "Aiko Tanaka", role: "Frequent Traveler", quote: "The booking flow is unreal — it took me thirty seconds to book a sleeper to Granite Hollow.", avatar: "AT" },
  { name: "Marcus Bell", role: "Business Commuter", quote: "Live status cards saved me from running for a delayed train. Beautifully designed too.", avatar: "MB" },
  { name: "Priya Shah", role: "Student", quote: "I love the dark mode and the seat picker. Feels like a sci-fi terminal.", avatar: "PS" },
  { name: "Diego Romero", role: "Tourist", quote: "Found every popular route I needed. The map and contact page made everything simple.", avatar: "DR" },
];

export const passengers = Array.from({ length: 24 }).map((_, i) => ({
  id: `P-${1000 + i}`,
  name: ["Aiko Tanaka", "Marcus Bell", "Priya Shah", "Diego Romero", "Lena Hoffmann", "Omar Khalil", "Yuki Sato", "Nina Park"][i % 8],
  train: trains[i % trains.length].number,
  seat: `${["A", "B", "C", "D"][i % 4]}${10 + (i % 20)}`,
  date: `2026-05-${String((i % 28) + 1).padStart(2, "0")}`,
  status: (["confirmed", "pending", "confirmed", "checked-in"] as const)[i % 4],
}));

export const stats = {
  weekly: [
    { day: "Mon", bookings: 420, revenue: 31200 },
    { day: "Tue", bookings: 510, revenue: 38900 },
    { day: "Wed", bookings: 488, revenue: 36400 },
    { day: "Thu", bookings: 612, revenue: 45100 },
    { day: "Fri", bookings: 740, revenue: 56800 },
    { day: "Sat", bookings: 820, revenue: 62300 },
    { day: "Sun", bookings: 695, revenue: 51200 },
  ],
  byType: [
    { name: "HighSpeed", value: 38 },
    { name: "Express", value: 32 },
    { name: "Local", value: 22 },
    { name: "Sleeper", value: 8 },
  ],
};

export const features = [
  { icon: "Zap", title: "Real-time Status", desc: "Live arrival, departure and platform changes pushed instantly." },
  { icon: "Ticket", title: "One-tap Booking", desc: "From station search to seat picker in under thirty seconds." },
  { icon: "ShieldCheck", title: "Secure Payments", desc: "Bank-grade encryption on every transaction, every time." },
  { icon: "Map", title: "Smart Routing", desc: "AI-suggested connections across our entire network." },
  { icon: "Bell", title: "Trip Alerts", desc: "Be the first to know when your train boards or shifts platform." },
  { icon: "Sparkles", title: "Lounge Access", desc: "Premium lounges, fast-track entry and curated travel perks." },
];

export const faqs = [
  { q: "How early should I arrive at the station?", a: "We recommend 20 minutes for local trains and 45 minutes for high-speed and sleeper services." },
  { q: "Can I cancel or refund my ticket?", a: "Yes — refunds are processed within 24 hours when cancelled at least 2 hours before departure." },
  { q: "Are pets allowed onboard?", a: "Small pets in carriers travel free. Larger pets require a pet ticket and travel in designated carriages." },
  { q: "Is Wi-Fi available?", a: "Free high-speed Wi-Fi is available on all Express, HighSpeed and Sleeper services." },
  { q: "How do I find my platform?", a: "Platforms are shown on every status card and on station displays 20 minutes before departure." },
];

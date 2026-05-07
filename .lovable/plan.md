# Modern Railway Station Management Website — Build Plan

A polished, futuristic, fully responsive train-station site with all 6 PRD pages, smooth scroll, custom cursor, scroll-triggered animations, and an interactive Three.js hero. Mock JSON data for v1 (no auth/DB) so all flows work end-to-end.

## Visual direction

- **Theme:** Futuristic dark-first with neon cyan + violet accents, glassmorphism, soft gradients, glowing edges. Light-mode toggle included.
- **Type:** Display: Space Grotesk. Body: Inter. (Already a deviation from defaults.)
- **Motion:** Lenis smooth scroll, GSAP ScrollTrigger for scroll-driven reveals/parallax, Framer Motion for component-level animation, custom magnetic cursor with hover states.
- **3D:** One interactive Three.js scene in the home hero (animated train tunnel / particle rails reacting to scroll + cursor). Other pages use lighter scroll animations to keep performance solid.

## Pages (TanStack Start file routes)

1. `/` — Home: hero with Three.js scene, live train status cards, route search form, features grid, popular routes, testimonials carousel, footer.
2. `/schedule` — Filterable schedule table (destination, time, train type), color-coded status badges, pagination.
3. `/booking` — Multi-step: passenger details → train + class → visual seat picker → payment method cards → summary → success modal.
4. `/admin` — Sidebar layout, stats cards, Recharts (bar + pie), schedule CRUD (in-memory), passenger table with search/sort, notifications panel.
5. `/about` — Mission, animated timeline, animated counters, team grid.
6. `/contact` — Contact form, embedded map iframe, info cards, FAQ accordion.

Shared header (logo, nav, login button, theme toggle, mobile menu) and footer on all public pages. Admin uses its own sidebar layout.

## Deployment note (important)

The user asked for "vercel files." This template runs on **TanStack Start + Cloudflare Workers**, not Vercel's React-Router preset. Lovable's built-in Publish button deploys it correctly with zero config. I'll add a `vercel.json` as requested for reference, but the recommended path is the Publish button — Vercel deployment of this stack would need a separate adapter setup outside Lovable.

## Tech additions

- `three`, `@react-three/fiber`, `@react-three/drei` — hero 3D scene
- `gsap` — ScrollTrigger animations
- `lenis` — smooth scroll
- `framer-motion` — component animations
- `recharts` — admin charts
- `embla-carousel-react` — testimonials (already shadcn-compatible)
- Lucide icons + shadcn UI (already installed)

## Architecture

```text
src/
  routes/
    __root.tsx           # providers: Lenis, CustomCursor, Theme
    index.tsx            # Home
    schedule.tsx
    booking.tsx
    admin.tsx            # standalone layout (no public header)
    about.tsx
    contact.tsx
  components/
    layout/ (Header, Footer, PublicLayout)
    cursor/CustomCursor.tsx
    smooth-scroll/LenisProvider.tsx
    three/HeroScene.tsx
    home/ (LiveStatusCards, SearchForm, Features, PopularRoutes, Testimonials)
    schedule/ (Filters, ScheduleTable, Pagination)
    booking/ (PassengerForm, TrainSelect, SeatPicker, PaymentCards, Summary, SuccessModal)
    admin/ (Sidebar, StatCards, Charts, ScheduleManager, PassengerTable, Notifications)
    about/ (Timeline, Counters, TeamGrid)
    contact/ (ContactForm, FAQ, MapEmbed)
  data/ (trains.ts, routes.ts, passengers.ts, testimonials.ts) # mock JSON
  hooks/ (use-theme.ts, use-mock-data.ts)
  styles.css             # design tokens (oklch), glass + glow utilities
```

## Build phases

1. **Foundation:** install deps, design tokens (dark/light, neon palette, gradients, shadow-glow), theme toggle, Lenis provider, custom cursor, public layout (header + footer), admin layout.
2. **Home:** Three.js hero scene + scroll/parallax, status cards, search form, features, popular routes, testimonials, footer. Mock data wired in.
3. **Schedule + Booking:** filter table with pagination + multi-step booking flow with seat picker and success modal.
4. **Admin:** sidebar, stats, charts, schedule CRUD, passenger table, notifications.
5. **About + Contact:** timeline, counters, team, form, map, FAQ.
6. **Polish + deploy file:** scroll-to-top, skeletons, route transitions, SEO meta per route, add `vercel.json` reference file, verify build.

## Out of scope for v1

- Real authentication / database (mock only). Can add Lovable Cloud later for real bookings + admin auth.
- Real payment processing.
- Real-time train data feed.

Ready to build when you click Implement.

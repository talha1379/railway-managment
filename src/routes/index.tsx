import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Hero } from "@/components/home/Hero";
import { LiveStatus } from "@/components/home/LiveStatus";
import { SearchForm } from "@/components/home/SearchForm";
import { Features } from "@/components/home/Features";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { Testimonials } from "@/components/home/Testimonials";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RailNova — Modern Railway Terminal" },
      { name: "description", content: "Real-time schedules, instant booking, and a beautifully crafted terminal experience." },
    ],
  }),
});

function Index() {
  return (
    <PublicLayout>
      <Hero />
      <SearchForm />
      <LiveStatus />
      <Features />
      <PopularRoutes />
      <Testimonials />
    </PublicLayout>
  );
}

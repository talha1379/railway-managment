import { testimonials } from "@/data/mock";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback } from "react";

export function Testimonials() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Riders say</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Loved at every platform.</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={scrollPrev} className="grid h-10 w-10 place-items-center rounded-full glass hover:shadow-glow"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={scrollNext} className="grid h-10 w-10 place-items-center rounded-full glass hover:shadow-glow"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="overflow-hidden" ref={ref}>
        <div className="flex gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
              <div className="glass rounded-3xl p-6 h-full">
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-4 text-base leading-relaxed">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full gradient-bg text-sm font-semibold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

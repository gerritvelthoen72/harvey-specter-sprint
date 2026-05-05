"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";

export type ServiceItem = {
  _id: string;
  order: number;
  title: string;
  tagline: string | null;
  description: string | null;
  deliverables: string[] | null;
  imageUrl: string;
};

export default function ServicesDetailClient({ services }: { services: ServiceItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".service-item");
      if (!items) return;
      Array.from(items).forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-4 md:px-8 py-12 md:py-[100px]">
      <div className="flex flex-col">
        {services.map((s, i) => (
          <div key={s._id} className="service-item">

            {/* Rule + number */}
            <div className="w-full border-t border-black pt-8 mb-8 flex items-center justify-between">
              <span style={{ fontFamily: mono, fontSize: 13, color: "#888" }}>
                [ {String(i + 1).padStart(2, "0")} ]
              </span>
              <span
                className="uppercase"
                style={{ fontFamily: mono, fontSize: 13, color: "#888" }}
              >
                [ {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")} ]
              </span>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid grid-cols-12 gap-8 pb-20">

              {/* Left col: title + tagline + deliverables */}
              <div className="col-span-5 flex flex-col gap-6">
                <h2
                  className="uppercase"
                  style={{
                    fontFamily: sans,
                    fontSize: "clamp(32px, 3.5vw, 52px)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "#000",
                  }}
                >
                  {s.title}
                </h2>
                {s.tagline && (
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#555",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.tagline}
                  </p>
                )}

                {s.deliverables && s.deliverables.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    <p style={{ fontFamily: mono, fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Deliverables
                    </p>
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-3">
                        <span className="w-1 h-1 rounded-full bg-black shrink-0" />
                        <span style={{ fontFamily: sans, fontSize: 14, color: "#1f1f1f", letterSpacing: "-0.03em" }}>{d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Middle col: description */}
              <div className="col-span-4 flex items-start pt-1">
                {s.description && (
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 15,
                      color: "#1f1f1f",
                      lineHeight: 1.6,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.description}
                  </p>
                )}
              </div>

              {/* Right col: image */}
              <div className="col-span-3">
                {s.imageUrl && (
                  <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden flex flex-col gap-5 pb-12">
              <h2
                className="uppercase"
                style={{
                  fontFamily: sans,
                  fontSize: 32,
                  fontWeight: 700,
                  fontStyle: "italic",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#000",
                }}
              >
                {s.title}
              </h2>
              {s.imageUrl && (
                <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: "16/9" }}>
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                </div>
              )}
              {s.description && (
                <p style={{ fontFamily: sans, fontSize: 15, color: "#1f1f1f", lineHeight: 1.6, letterSpacing: "-0.03em" }}>
                  {s.description}
                </p>
              )}
              {s.deliverables && s.deliverables.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p style={{ fontFamily: mono, fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Deliverables
                  </p>
                  {s.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-black shrink-0" />
                      <span style={{ fontFamily: sans, fontSize: 14, color: "#1f1f1f", letterSpacing: "-0.03em" }}>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ))}
        <div className="border-t border-black" />
      </div>
    </section>
  );
}

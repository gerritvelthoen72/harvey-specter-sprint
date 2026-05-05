"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";

const services = [
  {
    num: "[ 01 ]",
    title: "Brand Discovery",
    img: "/service-brand.jpg",
    tagline: "Identity that speaks before you do.",
    deliverables: ["Logo system", "Visual language", "Typography & colour", "Brand guidelines", "Asset library"],
    desc: "Every great brand starts with a clear sense of self. I work with you to uncover what makes your business distinct — your values, your audience, and the feeling you want to leave behind. From that foundation, I build a visual identity that's strategic, cohesive, and built to last across every touchpoint.",
  },
  {
    num: "[ 02 ]",
    title: "Web Design & Dev",
    img: "/service-web.jpg",
    tagline: "Beautiful experiences, engineered to perform.",
    deliverables: ["UX / UI design", "Responsive build", "CMS integration", "Performance optimisation", "SEO foundations"],
    desc: "I design and build websites that balance aesthetic precision with seamless usability. Whether it's a portfolio, a marketing site, or a complex product, every project is crafted with care — clean code, smooth interactions, and a relentless focus on the user.",
  },
  {
    num: "[ 03 ]",
    title: "Marketing",
    img: "/service-marketing.jpg",
    tagline: "Strategy that turns attention into action.",
    deliverables: ["Campaign strategy", "Social content", "Art direction", "Copywriting", "Analytics & reporting"],
    desc: "Great creative deserves to be seen. I help brands develop marketing campaigns that connect — from initial strategy through to art-directed content and distribution. Everything is built around your specific audience and measured against real outcomes.",
  },
  {
    num: "[ 04 ]",
    title: "Photography",
    img: "/service-photography.jpg",
    tagline: "Moments captured with intention.",
    deliverables: ["Commercial shoots", "Portrait sessions", "Location work", "Post-production", "Licensing"],
    desc: "My photography practice spans editorial, commercial, and documentary work. I shoot with a cinematic eye — always looking for the frame that tells the story without words. Whether it's a product campaign or a personal portrait, the result is imagery that's authentic, considered, and lasting.",
  },
];

export default function ServicesDetail() {
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
          <div key={s.num} className="service-item">

            {/* Rule + number */}
            <div className="w-full border-t border-black pt-8 mb-8 flex items-center justify-between">
              <span style={{ fontFamily: mono, fontSize: 13, color: "#888" }}>{s.num}</span>
              <span
                className="uppercase"
                style={{ fontFamily: mono, fontSize: 13, color: "#888" }}
              >
                [ {String(i + 1).padStart(2, "0")} / 04 ]
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
              </div>

              {/* Middle col: description */}
              <div className="col-span-4 flex items-start pt-1">
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: 15,
                    color: "#1f1f1f",
                    lineHeight: 1.6,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.desc}
                </p>
              </div>

              {/* Right col: image */}
              <div className="col-span-3">
                <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
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
              <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: "16/9" }}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <p style={{ fontFamily: sans, fontSize: 15, color: "#1f1f1f", lineHeight: 1.6, letterSpacing: "-0.03em" }}>
                {s.desc}
              </p>
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
            </div>

          </div>
        ))}
        <div className="border-t border-black" />
      </div>
    </section>
  );
}

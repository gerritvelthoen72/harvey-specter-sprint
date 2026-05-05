"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";

const skills = [
  { num: "[ 1 ]", title: "Brand Identity", desc: "Logo systems, visual language, typography, colour, and brand guidelines built to scale across every touchpoint." },
  { num: "[ 2 ]", title: "Art Direction", desc: "Creative vision from concept to final frame — photography, layout, and visual storytelling that commands attention." },
  { num: "[ 3 ]", title: "Web Design & Dev", desc: "Performant, beautifully crafted digital experiences that balance aesthetic precision with seamless usability." },
  { num: "[ 4 ]", title: "Photography", desc: "Documentary and commercial photography with a cinematic eye, built around authentic moments and strong light." },
];

const stats = [
  { value: "8+", label: "Years experience" },
  { value: "120+", label: "Projects delivered" },
  { value: "40+", label: "Happy clients" },
  { value: "3×", label: "Award winner" },
];

export default function AboutSkills() {
  const sectionRef  = useRef<HTMLElement>(null);
  const statRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Count-up for each stat
      stats.forEach((s, i) => {
        const el  = statRefs.current[i];
        if (!el) return;
        const num    = parseInt(s.value, 10);
        const suffix = s.value.replace(/[0-9]/g, "");
        const obj    = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      // Skill rows fade-up
      const items = sectionRef.current?.querySelectorAll(".skill-row");
      if (!items) return;
      Array.from(items).forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f3f3f3] px-4 md:px-8 py-12 md:py-[100px]">

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 md:mb-20 text-center items-center justify-items-center">
        {stats.map((s, i) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span
              ref={(el) => { statRefs.current[i] = el; }}
              style={{
                fontFamily: sans,
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.07em",
                lineHeight: 1,
                color: "#000",
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: mono,
                fontSize: 13,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Section label */}
      <p
        className="mb-8 uppercase"
        style={{ fontFamily: mono, fontSize: 14, color: "#000", lineHeight: 1.1 }}
      >
        [ 002 — Expertise ]
      </p>

      {/* Skills list */}
      <div className="flex flex-col">
        {skills.map((s) => (
          <div
            key={s.num}
            className="skill-row group flex flex-col gap-2 py-6 border-t border-black transition-opacity duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
              <div className="flex items-baseline gap-3 shrink-0">
                <span style={{ fontFamily: mono, fontSize: 13, color: "#888" }}>{s.num}</span>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                >
                  {s.title}
                </span>
              </div>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  color: "#1f1f1f",
                  lineHeight: 1.4,
                  letterSpacing: "-0.03em",
                  maxWidth: 420,
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
        <div className="border-t border-black" />
      </div>

    </section>
  );
}

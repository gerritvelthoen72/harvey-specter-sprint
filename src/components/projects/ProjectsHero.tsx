"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const countRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.fromTo(
        [labelRef.current, titleRef.current, countRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.12, delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full h-[500px] md:h-[700px] overflow-hidden flex flex-col"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/portfolio-surfers.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px]"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
      />

      <div className="relative flex flex-col justify-end h-full px-4 md:px-8 pb-12 md:pb-16">
        <p
          ref={labelRef}
          className="mb-3 uppercase"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.05em",
          }}
        >
          [ Selected Work ]
        </p>
        <div className="flex items-end justify-between">
          <h1
            ref={titleRef}
            className="uppercase text-white"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(48px, 10vw, 144px)",
              fontWeight: 300,
              letterSpacing: "-0.07em",
              lineHeight: 0.9,
            }}
          >
            Projects
          </h1>
          <span
            ref={countRef}
            className="text-white mb-2"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.05em",
            }}
          >
            004
          </span>
        </div>
      </div>
    </section>
  );
}

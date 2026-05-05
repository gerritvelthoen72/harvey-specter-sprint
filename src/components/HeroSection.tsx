"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TalkButton from "./TalkButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  // Parallax refs
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const helloRef    = useRef<HTMLParagraphElement>(null);
  const harveyRef   = useRef<HTMLSpanElement>(null);
  const specterRef  = useRef<HTMLSpanElement>(null);

  // ── Parallax scroll ────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // "Harvey" + "Hello I'm" exit left
      tl.to([harveyRef.current, helloRef.current], { x: "-45vw", ease: "none" }, 0);

      // "Specter" exits right
      tl.to(specterRef.current, { x: "45vw", ease: "none" }, 0);

      // Background zooms in
      tl.to(bgRef.current, { scale: 1.18, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate w-full h-[635px] md:h-[847px] overflow-hidden flex flex-col">
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none bg-cover md:[background-size:170%]"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundPosition: "50% 26%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Frosted glass */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)]"
        style={{
          maskImage: "linear-gradient(to top, black 55%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 55%, transparent)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col h-full px-4 md:px-8">

        {/* Hero block */}
        <div className="flex-1 flex flex-col justify-center">
          <div
            className="flex flex-col items-center md:items-start mx-auto"
            style={{ width: "fit-content", maxWidth: "100%" }}
          >
            {/* "Hello I'm" travels with Harvey */}
            <p
              ref={helloRef}
              className="text-white uppercase mix-blend-overlay leading-[1.1] text-[14px] tracking-wide whitespace-nowrap"
              style={{ fontFamily: "var(--font-geist-mono)", display: "inline-block" }}
            >
              [ Hello i&apos;m ]
            </p>

            {/* Each word is an independent inline-block so GSAP can move them separately */}
            <h1
              className="text-center md:text-left text-white capitalize mix-blend-overlay font-medium leading-[1.1]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(60px, 13.75vw, 198px)",
                letterSpacing: "-0.07em",
              }}
            >
              <span ref={harveyRef}  style={{ display: "inline-block" }}>Harvey</span>
              <span style={{ display: "inline-block", width: "0.25em" }} />
              <span ref={specterRef} style={{ display: "inline-block" }}>Specter</span>
            </h1>

            <div className="flex w-full mt-3 md:mt-2 md:justify-end">
              <div
                className="flex flex-col gap-[17px] items-start w-full md:w-[294px]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.035em] uppercase leading-[1.1]">
                  <strong>H.Studio is a </strong>
                  <span className="font-normal">full-service</span>
                  <strong> creative studio creating beautiful digital experiences and products. We are an </strong>
                  <span className="font-normal">award winning</span>
                  <strong> design and art group specializing in branding, web design and engineering.</strong>
                </p>
                <TalkButton className="self-center md:self-start border border-black text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em] cursor-pointer">
                  Let&apos;s talk
                </TalkButton>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

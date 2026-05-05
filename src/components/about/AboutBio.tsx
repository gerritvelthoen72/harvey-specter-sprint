"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";
const playfair = "var(--font-playfair)";

const paragraphs = [
  "I'm a creative director and photographer born and raised on the south side of Chicago. With over 8 years in the industry, I've built a practice rooted in the belief that great design is never just aesthetic — it's strategic, human, and built to last.",
  "My work spans brand identity, web design, art direction, and photography. I approach every project as a collaboration, working closely with clients to understand not just what they need, but why they need it — and how to make it resonate with the people who matter most to them.",
  "I founded H.Studio to bring together the disciplines I love under one roof: craft, technology, and storytelling. Whether I'm shooting on location or architecting a digital experience, my goal is always the same — to make something worth remembering.",
];

export default function AboutBio() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRef      = useRef<HTMLImageElement>(null);
  const linesRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Portrait reveal
      gsap.set(imgRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(imgRef.current, {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Paragraphs fade up
      const paras = linesRef.current?.querySelectorAll(".bio-para");
      if (paras) {
        Array.from(paras).forEach((p) => {
          gsap.fromTo(
            p,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: p,
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-4 md:px-8 py-12 md:py-[100px]">

      {/* Desktop */}
      <div className="hidden md:flex items-start justify-between gap-16">

        {/* Left: label + portrait */}
        <div className="flex flex-col gap-6 shrink-0" style={{ width: 400 }}>
          <p
            style={{
              fontFamily: mono,
              fontSize: 14,
              color: "#000",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            [ 001 — Biography ]
          </p>
          <div className="overflow-hidden rounded-sm bg-black" style={{ height: 560 }}>
            <img
              ref={imgRef}
              src="/about-portrait.jpg"
              alt="Harvey Specter"
              className="block w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: text */}
        <div ref={linesRef} className="flex flex-col gap-8 pt-12" style={{ maxWidth: 560 }}>
          <h2
            className="uppercase"
            style={{
              fontFamily: sans,
              fontSize: "clamp(32px, 4vw, 64px)",
              fontWeight: 300,
              letterSpacing: "-0.07em",
              lineHeight: 0.9,
              color: "#000",
            }}
          >
            Born to create.
            <br />
            <em style={{ fontFamily: playfair, fontWeight: 400 }}>Built</em> to lead.
          </h2>

          <div className="w-full border-t border-black" />

          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="bio-para"
              style={{
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 400,
                color: "#1f1f1f",
                lineHeight: 1.5,
                letterSpacing: "-0.03em",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-8">
        <p
          style={{
            fontFamily: mono,
            fontSize: 14,
            color: "#000",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          [ 001 — Biography ]
        </p>

        <h2
          className="uppercase"
          style={{
            fontFamily: sans,
            fontSize: 40,
            fontWeight: 300,
            letterSpacing: "-0.07em",
            lineHeight: 0.9,
            color: "#000",
          }}
        >
          Born to create.
          <br />
          <em style={{ fontFamily: playfair, fontWeight: 400 }}>Built</em> to lead.
        </h2>

        <div className="overflow-hidden rounded-sm bg-black w-full" style={{ aspectRatio: "4/5" }}>
          <img
            src="/about-portrait.jpg"
            alt="Harvey Specter"
            className="block w-full h-full object-cover"
          />
        </div>

        <div className="w-full border-t border-black" />

        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 400,
              color: "#1f1f1f",
              lineHeight: 1.5,
              letterSpacing: "-0.03em",
            }}
          >
            {p}
          </p>
        ))}
      </div>

    </section>
  );
}

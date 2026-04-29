"use client";

import { useState } from "react";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative isolate w-full h-[635px] md:h-[847px] overflow-hidden flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "170%",
          backgroundPosition: "50% 26%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Frosted glass — fades in gradually from bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)]"
        style={{
          maskImage: "linear-gradient(to top, black 55%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 55%, transparent)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col h-full px-4 md:px-8">

        {/* Nav */}
        <nav className="shrink-0 flex items-center justify-between py-6">
          <span
            className="text-base font-semibold tracking-[-0.04em] text-black capitalize"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            H.Studio
          </span>

          <div
            className="hidden md:flex items-center gap-14 text-base font-semibold tracking-[-0.04em] text-black capitalize"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {["About", "Services", "Projects", "News", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
                {item}
              </a>
            ))}
          </div>

          <button
            className="hidden md:flex items-center justify-center bg-black text-white text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em] cursor-pointer"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Let&apos;s talk
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <>
                <span className="block w-6 h-[2px] bg-black rotate-45 translate-y-[7px]" />
                <span className="block w-6 h-[2px] bg-black opacity-0" />
                <span className="block w-6 h-[2px] bg-black -rotate-45 -translate-y-[7px]" />
              </>
            ) : (
              <>
                <span className="block w-6 h-[2px] bg-black" />
                <span className="block w-6 h-[2px] bg-black" />
                <span className="block w-6 h-[2px] bg-black" />
              </>
            )}
          </button>
        </nav>

        {/* Mobile full-screen menu */}
        {menuOpen && (
          <div
            className="md:hidden absolute inset-0 z-20 bg-black/90 backdrop-blur-sm flex flex-col px-8 pt-24 gap-8"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <button
              className="absolute top-6 right-4 p-1"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span className="block w-6 h-[2px] bg-white rotate-45 translate-y-[1px]" />
              <span className="block w-6 h-[2px] bg-white -rotate-45" />
            </button>
            {["About", "Services", "Projects", "News", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white text-3xl font-semibold capitalize tracking-[-0.04em]"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              className="mt-4 self-start bg-white text-black text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em]"
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s talk
            </button>
          </div>
        )}

        {/* Hero block — vertically centered in space below nav */}
        <div className="flex-1 flex flex-col justify-center">

          {/* Label + H1 — group centered on screen, label aligned with H */}
          <div
            className="flex flex-col items-center md:items-start mx-auto"
            style={{ width: "fit-content", maxWidth: "100%" }}
          >
            <p
              className="text-white uppercase mix-blend-overlay leading-[1.1] text-[14px] tracking-wide whitespace-nowrap"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              [ Hello i&apos;m ]
            </p>
            <h1
              className="text-center md:text-left text-white capitalize mix-blend-overlay font-medium leading-[1.1]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(60px, 13.75vw, 198px)",
                letterSpacing: "-0.07em",
                wordSpacing: "0.25em",
              }}
            >
              Harvey Specter
            </h1>
          </div>

          {/* Body copy + CTA — directly beneath h1, right-aligned on desktop */}
          <div className="flex md:justify-end w-full mt-3 md:mt-2">
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
              <button className="bg-black text-white text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em] cursor-pointer">
                Let&apos;s talk
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

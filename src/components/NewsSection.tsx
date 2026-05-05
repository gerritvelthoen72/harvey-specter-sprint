"use client";

import React, { useRef, useState } from "react";

const sans = "var(--font-dm-sans)";

const articles = [
  { img: "/news-1.jpg", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", offset: false },
  { img: "/news-2.jpg", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", offset: true },
  { img: "/news-3.jpg", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", offset: false },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 14L14 4M14 4H6M14 4V12" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArticleCard({ img, body, imgHeight }: { img: string; body: string; imgHeight: number }) {
  return (
    <div className="group flex flex-col gap-4 w-full">
      <div className="w-full overflow-hidden shrink-0" style={{ height: imgHeight }}>
        <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <p
        style={{
          fontFamily: sans,
          fontSize: 14,
          fontWeight: 400,
          color: "#1f1f1f",
          lineHeight: 1.3,
          letterSpacing: "-0.04em",
        }}
      >
        {body}
      </p>
      <div
        className="flex items-center gap-[10px] border-b border-black pb-1 self-start"
        style={{ cursor: "pointer" }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 500,
            color: "#000",
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
          }}
        >
          Read more
        </span>
        <ArrowIcon />
      </div>
    </div>
  );
}

export default function NewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / articles.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), articles.length - 1));
  }

  return (
    <section className="w-full bg-[#f3f3f3] px-4 md:px-8 py-16 md:py-[120px]">

      {/* ── Mobile ── */}
      <div className="md:hidden flex flex-col gap-8">
        <h2
          className="uppercase"
          style={{
            fontFamily: sans,
            fontSize: 32,
            fontWeight: 300,
            color: "#000",
            letterSpacing: "-0.08em",
            lineHeight: 0.86,
          }}
        >
          Keep up with my latest news &amp; achievements
        </h2>

        {/* Scroll-snap slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: "flex",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            gap: 16,
            marginLeft: -16,
            marginRight: -16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 8,
          }}
        >
          {articles.map((a, i) => (
            <div
              key={i}
              style={{
                scrollSnapAlign: "center",
                flexShrink: 0,
                width: "calc(100vw - 48px)",
              }}
            >
              <ArticleCard img={a.img} body={a.body} imgHeight={398} />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {articles.map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i === activeIndex ? "#000" : "#d1d1d1",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-end justify-between gap-8">

        {/* Left: rotated heading */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 110, height: 706 }}
        >
          <h2
            className="-rotate-90 uppercase whitespace-nowrap"
            style={{
              fontFamily: sans,
              fontSize: 64,
              fontWeight: 300,
              color: "#000",
              letterSpacing: "-0.08em",
              lineHeight: 0.86,
            }}
          >
            <span>Keep up with my latest</span>
            <br />
            <span>news &amp; achievements</span>
          </h2>
        </div>

        {/* Right: 3 staggered cards with dividers */}
        <div className="flex items-start flex-1 min-w-0 gap-0">
          {articles.map((a, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div
                  className="self-stretch shrink-0 bg-black mx-8"
                  style={{ width: 1 }}
                />
              )}
              <div
                className="flex-1 min-w-0"
                style={{ paddingTop: a.offset ? 120 : 0 }}
              >
                <ArticleCard img={a.img} body={a.body} imgHeight={469} />
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>

    </section>
  );
}

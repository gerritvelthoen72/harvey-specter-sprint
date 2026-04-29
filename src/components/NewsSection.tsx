import React from "react";

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
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full overflow-hidden shrink-0" style={{ height: imgHeight }}>
        <img src={img} alt="" className="w-full h-full object-cover" />
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
  return (
    <section className="w-full bg-[#f3f3f3] px-4 md:px-8 py-16 md:py-[120px]">

      {/* ── Mobile ── */}
      <div className="md:hidden flex flex-col gap-8">
        {/* Heading */}
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
        {/* Cards — horizontal scroll, 2nd card partially visible */}
        <div
          className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {articles.map((a, i) => (
            <div key={i} className="shrink-0" style={{ width: 300 }}>
              <ArticleCard img={a.img} body={a.body} imgHeight={398} />
            </div>
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

const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";

const label: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 14,
  color: "#000000",
  lineHeight: 1.1,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

const bodyText: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 14,
  color: "#000000",
  lineHeight: 1.3,
  letterSpacing: "-0.04em",
};

/* Simple L-shaped corner bracket, rotated per position */
function Corner({ deg }: { deg: 0 | 90 | 180 | 270 }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ transform: `rotate(${deg}deg)`, flexShrink: 0 }}
    >
      <path d="M0 16 L0 0 L16 0" stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

/* Text block framed by four corner brackets */
function QuotedText({ text }: { text: string }) {
  return (
    <div className="flex items-stretch gap-3">
      {/* Left brackets */}
      <div className="flex flex-col justify-between shrink-0">
        <Corner deg={0} />
        <Corner deg={270} />
      </div>
      {/* Body */}
      <p className="py-3" style={bodyText}>{text}</p>
      {/* Right brackets */}
      <div className="flex flex-col justify-between shrink-0">
        <Corner deg={90} />
        <Corner deg={180} />
      </div>
    </div>
  );
}

const aboutText =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

export default function AboutSection() {
  return (
    <section className="w-full bg-white px-4 md:px-8 py-12 md:py-[80px]">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start justify-between gap-8">

        {/* Left: section label */}
        <p style={label}>[ About ]</p>

        {/* Right: text block + image, bottoms aligned */}
        <div className="flex items-end gap-8" style={{ width: 983 }}>

          {/* Text block — grows to fill left portion */}
          <div className="flex-1 min-w-0">
            <QuotedText text={aboutText} />
          </div>

          {/* 002 + portrait */}
          <div className="flex flex-col gap-6 shrink-0">
            <p style={label}>002</p>
            <div className="overflow-hidden rounded-sm" style={{ width: 436, height: 614 }}>
              <img
                src="/about-portrait.jpg"
                alt="About portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden flex flex-col gap-5">
        <p style={label}>002</p>
        <p style={label}>[ About ]</p>
        <QuotedText text={aboutText} />
        <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: "422 / 594" }}>
          <img
            src="/about-portrait.jpg"
            alt="About portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
}

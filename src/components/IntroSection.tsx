const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";
const playfair = "var(--font-playfair)";

const headingStyle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: "clamp(28px, 6.67vw, 96px)",
  fontWeight: 300,
  letterSpacing: "-0.08em",
  lineHeight: 0.84,
  color: "#000000",
};

const labelStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 14,
  color: "#000000",
  lineHeight: 1.1,
};

export default function IntroSection() {
  return (
    <section className="w-full bg-white px-4 md:px-8 py-12 md:py-[120px]">

      {/* Label + divider */}
      <div className="flex flex-col gap-3 w-full mb-6 md:mb-6">
        <p className="text-right uppercase" style={labelStyle}>
          [ 8+ years in industry ]
        </p>
        <div className="w-full border-t border-black" />
      </div>

      {/* Desktop: staggered */}
      <div className="hidden md:flex flex-col gap-2 uppercase">

        <div className="flex items-start gap-3">
          <span style={headingStyle}>A creative director&nbsp;&nbsp;&nbsp;/</span>
          <span className="mt-1" style={labelStyle}>001</span>
        </div>

        <div className="pl-[15.5%]">
          <span style={headingStyle}>Photographer</span>
        </div>

        <div className="pl-[44.3%]">
          <span style={headingStyle}>
            Born <em style={{ fontFamily: playfair, fontWeight: 400 }}>&amp;</em> raised
          </span>
        </div>

        <div>
          <span style={headingStyle}>On the south side</span>
        </div>

        <div className="relative pl-[44%]">
          <span style={headingStyle}>Of chicago.</span>
          <span
            className="absolute right-0 top-[1.5em] whitespace-nowrap"
            style={labelStyle}
          >
            [ creative freelancer ]
          </span>
        </div>

      </div>

      {/* Mobile: centered */}
      <div className="md:hidden flex flex-col items-center gap-2 text-center uppercase">
        <span style={labelStyle}>001</span>
        {(["A creative director   /", "Photographer"] as const).map((line) => (
          <span key={line} style={headingStyle}>{line}</span>
        ))}
        <span style={headingStyle}>
          Born <em style={{ fontFamily: playfair, fontWeight: 400 }}>&amp;</em> raised
        </span>
        {(["On the south side", "Of chicago."] as const).map((line) => (
          <span key={line} style={headingStyle}>{line}</span>
        ))}
        <span className="mt-2" style={labelStyle}>[ creative freelancer ]</span>
      </div>

    </section>
  );
}

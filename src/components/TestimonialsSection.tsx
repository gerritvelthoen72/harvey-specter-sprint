const sans = "var(--font-dm-sans)";

interface CardData {
  logo: string;
  logoW: number;
  logoH: number;
  quote: string;
  author: string;
}

const testimonials: CardData[] = [
  {
    logo: "/testimonial-logo-lukas.svg",
    logoW: 138,
    logoH: 19,
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    author: "Lukas Weber",
  },
  {
    logo: "/testimonial-logo-marko.svg",
    logoW: 143,
    logoH: 19,
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    author: "Marko Stojković",
  },
  {
    logo: "/testimonial-logo-sarah.svg",
    logoW: 109,
    logoH: 31,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: "Sarah Jenkins",
  },
  {
    logo: "/testimonial-logo-sofia.svg",
    logoW: 81,
    logoH: 36,
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    author: "Sofia Martínez",
  },
];

function Card({ data, rotation, width = 353 }: { data: CardData; rotation: number; width?: number }) {
  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
        width,
        flexShrink: 0,
        background: "#f1f1f1",
        border: "1px solid #ddd",
        borderRadius: 4,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <img
        src={data.logo}
        alt=""
        style={{ width: data.logoW, height: data.logoH, objectFit: "contain" }}
      />
      <p
        style={{
          fontFamily: sans,
          fontSize: 18,
          fontWeight: 400,
          color: "#1f1f1f",
          lineHeight: 1.3,
          letterSpacing: "-0.04em",
        }}
      >
        {data.quote}
      </p>
      <p
        style={{
          fontFamily: sans,
          fontSize: 16,
          fontWeight: 700,
          color: "#000",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
        }}
      >
        {data.author}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white overflow-hidden">

      {/* ── Mobile ── */}
      <div className="md:hidden px-4 pt-16 pb-8 flex flex-col gap-8">
        <h2
          style={{
            fontFamily: sans,
            fontSize: 64,
            fontWeight: 500,
            color: "#000",
            letterSpacing: "-0.07em",
            lineHeight: 0.8,
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          Testimonials
        </h2>
        {/* Horizontal scroll strip — second card partially visible */}
        <div className="flex overflow-x-auto gap-0 -mx-4 px-4 pb-8" style={{ scrollbarWidth: "none" }}>
          <div style={{ marginRight: -10, flexShrink: 0 }}>
            <Card data={testimonials[1]} rotation={-3.5} width={260} />
          </div>
          <div style={{ flexShrink: 0 }}>
            <Card data={testimonials[3]} rotation={2} width={260} />
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block relative w-full px-8" style={{ height: 900 }}>

        {/* Heading — z-index 1, sits between behind/front card layers */}
        <h2
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-8 capitalize pointer-events-none"
          style={{
            fontFamily: sans,
            fontSize: 198,
            fontWeight: 500,
            color: "#000",
            letterSpacing: "-0.07em",
            lineHeight: 1.1,
            zIndex: 1,
          }}
        >
          Testimonials
        </h2>

        {/* Lukas — top-right, BEHIND the heading (z-index 0) */}
        <div style={{ position: "absolute", left: "47%", top: 240, zIndex: 0 }}>
          <Card data={testimonials[0]} rotation={2.9} />
        </div>

        {/* Marko — top-left, in front (z-index 2) */}
        <div style={{ position: "absolute", left: "6%", top: 120, zIndex: 2 }}>
          <Card data={testimonials[1]} rotation={-6.85} />
        </div>

        {/* Sarah — bottom-left/center, in front (z-index 2) */}
        <div style={{ position: "absolute", left: "20%", top: 530, zIndex: 2 }}>
          <Card data={testimonials[2]} rotation={2.23} />
        </div>

        {/* Sofia — bottom-right, in front (z-index 2) */}
        <div style={{ position: "absolute", left: "67%", top: 510, zIndex: 2 }}>
          <Card data={testimonials[3]} rotation={-4.15} />
        </div>

      </div>

    </section>
  );
}

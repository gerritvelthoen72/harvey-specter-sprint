const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";
const inter = "var(--font-inter)";

const labelStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 14,
  color: "#1f1f1f",
  lineHeight: 1.1,
  textTransform: "uppercase",
};

const projectTitleStyle: React.CSSProperties = {
  fontFamily: inter,
  fontWeight: 900,
  fontSize: 36,
  lineHeight: 1.1,
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  color: "#000000",
};

const projectTitleMobileStyle: React.CSSProperties = {
  ...projectTitleStyle,
  fontSize: 24,
};

const ctaTextStyle: React.CSSProperties = {
  fontFamily: sans,
  fontStyle: "italic",
  fontSize: 14,
  lineHeight: 1.3,
  letterSpacing: "-0.04em",
  color: "#1f1f1f",
};

/* L-shaped corner bracket, reused from AboutSection pattern */
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

/* ↗ arrow icon */
function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <path d="M9 23L23 9M23 9H11M23 9V21" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className="backdrop-blur-[10px] rounded-full px-2 py-1 whitespace-nowrap"
      style={{
        background: "rgba(255,255,255,0.3)",
        fontFamily: sans,
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: "-0.04em",
        color: "#111",
      }}
    >
      {label}
    </span>
  );
}

interface ProjectCardProps {
  title: string;
  img: string;
  tags: string[];
  desktopHeight: number;
}

function ProjectCard({ title, img, tags, desktopHeight }: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {/* Mobile image */}
      <div className="md:hidden relative w-full overflow-hidden" style={{ height: 390 }}>
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      {/* Desktop image */}
      <div className="hidden md:block relative w-full overflow-hidden" style={{ height: desktopHeight }}>
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      {/* Title row */}
      <div className="flex items-center justify-between">
        <p className="md:hidden" style={projectTitleMobileStyle}>{title}</p>
        <p className="hidden md:block" style={projectTitleStyle}>{title}</p>
        <ArrowIcon />
      </div>
    </div>
  );
}

function CTABlock() {
  return (
    <div className="flex items-stretch gap-3">
      <div className="flex flex-col justify-between shrink-0">
        <Corner deg={0} />
        <Corner deg={270} />
      </div>
      <div className="flex flex-col gap-[10px] py-3">
        <p style={ctaTextStyle}>
          Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
        </p>
        <button
          className="self-start rounded-full px-4 py-3 text-white"
          style={{
            background: "#000",
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "-0.04em",
          }}
        >
          Let&apos;s talk
        </button>
      </div>
      <div className="flex flex-col justify-between shrink-0">
        <Corner deg={90} />
        <Corner deg={180} />
      </div>
    </div>
  );
}

const projects = [
  { title: "Surfers Paradise", img: "/portfolio-surfers.jpg", tags: ["Social Media", "Photography"], desktopHeight: 744 },
  { title: "Cyberpunk Caffe",  img: "/portfolio-cyberpunk.jpg", tags: ["Social Media", "Photography"], desktopHeight: 699 },
  { title: "Agency 976",       img: "/portfolio-agency.jpg",   tags: ["Social Media", "Photography"], desktopHeight: 699 },
  { title: "Minimal Playground", img: "/portfolio-minimal.jpg", tags: ["Social Media", "Photography"], desktopHeight: 744 },
];

export default function PortfolioSection() {
  return (
    <section className="w-full bg-white px-4 md:px-8 py-12 md:py-[80px]">

      {/* ── Mobile header ── */}
      <div className="md:hidden flex flex-col gap-4 mb-8 uppercase">
        <p style={labelStyle}>[ portfolio ]</p>
        <div className="flex items-start justify-between w-full">
          <div
            style={{
              fontFamily: sans,
              fontWeight: 300,
              fontSize: 32,
              letterSpacing: "-0.08em",
              lineHeight: 0.86,
              color: "#000",
            }}
          >
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p style={labelStyle}>004</p>
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-start justify-between w-full mb-[61px] uppercase">
        <div className="flex items-start gap-3">
          <div
            style={{
              fontFamily: sans,
              fontWeight: 300,
              fontSize: 96,
              letterSpacing: "-0.08em",
              lineHeight: 0.86,
              color: "#000",
            }}
          >
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="mt-1" style={labelStyle}>004</p>
        </div>

        {/* Rotated [ PORTFOLIO ] label */}
        <div className="flex items-center justify-center shrink-0" style={{ width: 15, height: 110 }}>
          <p
            className="-rotate-90 whitespace-nowrap"
            style={labelStyle}
          >
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="md:hidden flex flex-col gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
        <CTABlock />
      </div>

      {/* ── Desktop: two-column staggered ── */}
      <div className="hidden md:flex items-start gap-6 w-full">
        {/* Left col: items 0 & 1 + CTA */}
        <div className="flex-1 flex flex-col gap-16 min-w-0">
          <ProjectCard {...projects[0]} />
          <ProjectCard {...projects[1]} />
          <CTABlock />
        </div>
        {/* Right col: offset 240px, items 2 & 3 */}
        <div className="flex-1 flex flex-col gap-16 min-w-0 pt-[240px]">
          <ProjectCard {...projects[2]} />
          <ProjectCard {...projects[3]} />
        </div>
      </div>

    </section>
  );
}

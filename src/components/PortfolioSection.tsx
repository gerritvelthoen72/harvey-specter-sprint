import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import TalkButton from "./TalkButton"

const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";
const inter = "var(--font-inter)";

const PORTFOLIO_QUERY = `*[_type == "portfolioItem"] | order(order asc) {
  _id,
  title,
  image { asset, alt },
  tags,
  link
}`

type PortfolioItem = {
  _id: string
  title: string
  image: { asset: { _ref: string; _type: string }; alt?: string } | null
  tags: string[] | null
  link: string | null
}

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
  title: string
  imageUrl: string
  alt: string
  tags: string[]
  desktopHeight: number
  link?: string | null
}

function ProjectCard({ title, imageUrl, alt, tags, desktopHeight, link }: ProjectCardProps) {
  const inner = (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="md:hidden relative w-full overflow-hidden" style={{ height: 390 }}>
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      <div className="hidden md:block relative w-full overflow-hidden" style={{ height: desktopHeight }}>
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="md:hidden" style={projectTitleMobileStyle}>{title}</p>
        <p className="hidden md:block" style={projectTitleStyle}>{title}</p>
        <ArrowIcon />
      </div>
    </div>
  )

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
  }
  return inner
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
        <TalkButton
          className="self-start rounded-full px-4 py-3"
          style={{ fontFamily: sans, fontWeight: 500, fontSize: 14, letterSpacing: "-0.04em" }}
        />
      </div>
      <div className="flex flex-col justify-between shrink-0">
        <Corner deg={90} />
        <Corner deg={180} />
      </div>
    </div>
  );
}

const DESKTOP_HEIGHTS = [744, 699, 699, 744]

export default async function PortfolioSection() {
  const { data } = await sanityFetch({ query: PORTFOLIO_QUERY })
  const items = (data ?? []) as PortfolioItem[]

  const cards = items.map((item: PortfolioItem, i: number) => ({
    title: item.title,
    imageUrl: item.image?.asset
      ? urlFor(item.image).width(900).auto('format').url()
      : '',
    alt: item.image?.alt ?? item.title,
    tags: item.tags ?? [],
    desktopHeight: DESKTOP_HEIGHTS[i] ?? 699,
    link: item.link,
  }))

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
        <div className="flex items-center justify-center shrink-0" style={{ width: 15, height: 110 }}>
          <p className="-rotate-90 whitespace-nowrap" style={labelStyle}>
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="md:hidden flex flex-col gap-6">
        {cards.map((c) => (
          <ProjectCard key={c.title} {...c} />
        ))}
        <CTABlock />
      </div>

      {/* ── Desktop: two-column staggered ── */}
      <div className="hidden md:flex items-start gap-6 w-full">
        <div className="flex-1 flex flex-col gap-16 min-w-0">
          {cards[0] && <ProjectCard {...cards[0]} />}
          {cards[1] && <ProjectCard {...cards[1]} />}
          <CTABlock />
        </div>
        <div className="flex-1 flex flex-col gap-16 min-w-0 pt-[240px]">
          {cards[2] && <ProjectCard {...cards[2]} />}
          {cards[3] && <ProjectCard {...cards[3]} />}
        </div>
      </div>

    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sans = "var(--font-dm-sans)";
const mono = "var(--font-geist-mono)";

export type ProjectItem = {
  _id: string;
  title: string;
  description: string | null;
  client: string | null;
  year: number | null;
  imageUrl: string;
  alt: string;
  tags: string[];
  link: string | null;
  order: number;
};

function ArrowIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <path d="M9 23L23 9M23 9H11M23 9V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className="rounded-full px-2 py-1 whitespace-nowrap backdrop-blur-sm"
      style={{
        background: "rgba(255,255,255,0.25)",
        fontFamily: sans,
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: "-0.03em",
        color: "#fff",
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const inner = (
    <div className="group flex flex-col gap-3 w-full">
      <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
        <img
          src={project.imageUrl}
          alt={project.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {project.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {project.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}
      </div>

      {/* Meta row: title + arrow */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <h3
          style={{
            fontFamily: sans,
            fontWeight: 700,
            fontSize: "clamp(20px, 2.5vw, 28px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            textTransform: "uppercase",
            color: "#000",
          }}
        >
          {project.title}
        </h3>
        <div
          className="shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{ color: "#000" }}
        >
          <ArrowIcon />
        </div>
      </div>

      {/* Client + year */}
      {(project.client || project.year) && (
        <div className="flex items-center gap-3">
          {project.client && (
            <span style={{ fontFamily: mono, fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {project.client}
            </span>
          )}
          {project.client && project.year && (
            <span style={{ fontFamily: mono, fontSize: 12, color: "#ccc" }}>—</span>
          )}
          {project.year && (
            <span style={{ fontFamily: mono, fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {project.year}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {project.description && (
        <p
          style={{
            fontFamily: sans,
            fontSize: 14,
            color: "#555",
            lineHeight: 1.5,
            letterSpacing: "-0.02em",
            maxWidth: 480,
          }}
        >
          {project.description}
        </p>
      )}
    </div>
  );

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

export default function ProjectsGridClient({ projects }: { projects: ProjectItem[] }) {
  const allTags   = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
  const [active, setActive] = useState("All");
  const gridRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const visible = active === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(active));

  // Animate cards in on scroll (run once on mount)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".project-card");
      if (!cards) return;
      Array.from(cards).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: (i % 2) * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Fade cards when filter changes
  function handleFilter(tag: string) {
    if (!gridRef.current) { setActive(tag); return; }
    gsap.to(gridRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActive(tag);
        gsap.to(gridRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
      },
    });
  }

  return (
    <section ref={sectionRef} className="w-full bg-white px-4 md:px-8 py-12 md:py-[80px]">

      {/* Filter bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
          {["All", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilter(tag)}
              className="px-4 py-2 rounded-full border transition-colors duration-200"
              style={{
                fontFamily: mono,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderColor: active === tag ? "#000" : "#ccc",
                background: active === tag ? "#000" : "transparent",
                color: active === tag ? "#fff" : "#888",
                cursor: "pointer",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div ref={gridRef}>
        {/* Mobile: single column */}
        <div className="md:hidden flex flex-col gap-10">
          {visible.map((p) => (
            <div key={p._id} className="project-card">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        {/* Desktop: 2-column staggered */}
        <div className="hidden md:grid grid-cols-2 gap-x-6 gap-y-16 items-start">
          {visible.map((p, i) => (
            <div
              key={p._id}
              className="project-card"
              style={{ marginTop: i % 2 === 1 ? 120 : 0 }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <p style={{ fontFamily: mono, fontSize: 14, color: "#aaa" }}>No projects in this category.</p>
        )}
      </div>

      {/* Count */}
      <p
        className="mt-16 md:mt-24 text-center"
        style={{ fontFamily: mono, fontSize: 13, color: "#bbb", letterSpacing: "0.05em", textTransform: "uppercase" }}
      >
        [ {visible.length} / {projects.length} projects ]
      </p>
    </section>
  );
}

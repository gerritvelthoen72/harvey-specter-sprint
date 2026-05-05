"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import TalkButton from "./TalkButton";

const navItems: { label: string; href: string }[] = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "#projects" },
  { label: "News",     href: "#news" },
  { label: "Contact",  href: "#contact" },
];

function NavLink({ item, scrolled }: { item: { label: string; href: string }; scrolled: boolean }) {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const color = scrolled ? "#000" : "#fff";

  return (
    <a
      href={item.href}
      className="relative inline-block transition-colors duration-300"
      style={{ color }}
      onMouseEnter={() =>
        gsap.to(underlineRef.current, { scaleX: 1, transformOrigin: "left center", duration: 0.3, ease: "power2.out" })
      }
      onMouseLeave={() =>
        gsap.to(underlineRef.current, { scaleX: 0, transformOrigin: "right center", duration: 0.25, ease: "power2.in" })
      }
    >
      {item.label}
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 w-full h-[1.5px]"
        style={{ backgroundColor: color, transform: "scaleX(0)" }}
      />
    </a>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bar1Ref      = useRef<HTMLSpanElement>(null);
  const bar2Ref      = useRef<HTMLSpanElement>(null);
  const bar3Ref      = useRef<HTMLSpanElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuBtnRef   = useRef<HTMLButtonElement>(null);

  const ORIGIN = "calc(100% - 28px) 36px";

  // Initial overlay state
  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: `circle(0px at ${ORIGIN})`, pointerEvents: "none" });
    gsap.set([...menuItemsRef.current, menuBtnRef.current], { opacity: 0, y: 24 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile menu animation
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }

    const tl = gsap.timeline();

    if (menuOpen) {
      gsap.set(overlayRef.current, { pointerEvents: "auto" });
      tl.to(overlayRef.current, { clipPath: `circle(150vmax at ${ORIGIN})`, duration: 0.65, ease: "power3.inOut" });
      tl.to([...menuItemsRef.current, menuBtnRef.current], { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: "power2.out" }, "-=0.3");
      tl.to(bar1Ref.current, { rotation: 45,  y:  7, duration: 0.3, ease: "power2.inOut" }, 0);
      tl.to(bar2Ref.current, { opacity: 0, duration: 0.15 }, 0);
      tl.to(bar3Ref.current, { rotation: -45, y: -7, duration: 0.3, ease: "power2.inOut" }, 0);
    } else {
      gsap.set([...menuItemsRef.current, menuBtnRef.current], { opacity: 0, y: 24 });
      tl.to(overlayRef.current, { clipPath: `circle(0px at ${ORIGIN})`, duration: 0.5, ease: "power3.inOut", onComplete: () => gsap.set(overlayRef.current, { pointerEvents: "none" }) });
      tl.to(bar1Ref.current, { rotation: 0, y: 0, duration: 0.3, ease: "power2.inOut" }, 0);
      tl.to(bar2Ref.current, { opacity: 1, duration: 0.2, delay: 0.1 }, 0);
      tl.to(bar3Ref.current, { rotation: 0, y: 0, duration: 0.3, ease: "power2.inOut" }, 0);
    }

    return () => { tl.kill(); };
  }, [menuOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header className="fixed top-0 left-0 right-0" style={{ zIndex: menuOpen ? 70 : 50 }}>
      <div
        className="flex items-center justify-between px-4 md:px-8 py-6 backdrop-blur-md transition-all duration-300"
        style={{ fontFamily: "var(--font-dm-sans)", background: scrolled ? "rgba(255,255,255,0.3)" : "transparent", backdropFilter: scrolled ? undefined : "none" }}
      >
        {/* Logo */}
        <a
          href="/"
          className="text-base font-semibold tracking-[-0.04em] capitalize transition-colors duration-300"
          style={{ color: scrolled ? "#000" : "#fff" }}
        >
          H.Studio
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-14 text-base font-semibold tracking-[-0.04em] capitalize">
          {navItems.map((item) => <NavLink key={item.label} item={item} scrolled={scrolled} />)}
        </div>

        {/* Desktop CTA */}
        <button
          className="hidden md:flex items-center justify-center text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em] cursor-pointer border transition-colors duration-300"
          style={{ color: scrolled ? "#000" : "#fff", borderColor: scrolled ? "#000" : "#fff", background: "transparent" }}
        >
          Let&apos;s talk
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span ref={bar1Ref} className="block w-6 h-[2px]" style={{ backgroundColor: menuOpen ? "#fff" : scrolled ? "#000" : "#fff" }} />
          <span ref={bar2Ref} className="block w-6 h-[2px]" style={{ backgroundColor: menuOpen ? "#fff" : scrolled ? "#000" : "#fff" }} />
          <span ref={bar3Ref} className="block w-6 h-[2px]" style={{ backgroundColor: menuOpen ? "#fff" : scrolled ? "#000" : "#fff" }} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-8"
        style={{ fontFamily: "var(--font-dm-sans)", clipPath: `circle(0px at ${ORIGIN})`, pointerEvents: "none" }}
      >
        {navItems.map((item, i) => (
          <a
            key={item.label}
            ref={(el) => { menuItemsRef.current[i] = el; }}
            href={item.href}
            className="text-white text-3xl font-semibold capitalize tracking-[-0.04em] text-center"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <TalkButton
          ref={menuBtnRef}
          variant="light"
          className="mt-4 border border-white text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em] cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          Let&apos;s talk
        </TalkButton>
      </div>
    </header>
  );
}

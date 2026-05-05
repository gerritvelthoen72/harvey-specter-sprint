"use client";

import React, { useRef, useEffect, useState, useCallback } from "react"; // useState kept for menuOpen + isDark
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TalkButton from "./TalkButton";

const navItems: { label: string; href: string }[] = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "News",     href: "#news" },
  { label: "Contact",  href: "#contact" },
];

function NavLink({ item }: { item: { label: string; href: string } }) {
  const underlineRef = useRef<HTMLSpanElement>(null);

  return (
    <a
      href={item.href}
      className="relative inline-block"
      onMouseEnter={() =>
        gsap.to(underlineRef.current, {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.3,
          ease: "power2.out",
        })
      }
      onMouseLeave={() =>
        gsap.to(underlineRef.current, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.25,
          ease: "power2.in",
        })
      }
    >
      {item.label}
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 w-full h-[1.5px]"
        style={{ transform: "scaleX(0)", backgroundColor: "currentColor" }}
      />
    </a>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Refs for stable reads inside callbacks
  const menuOpenRef = useRef(false);
  const isDarkRef = useRef(false);
  const isFirstRender = useRef(true);

  // Nav element refs
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const navBtnRef = useRef<HTMLButtonElement>(null);
  const navBtnThemeRef = useRef<{ animateToVariant: (v: "dark" | "light" | "ghost") => void } | null>(null);

  // Hamburger bar refs
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);
  const bar3Ref = useRef<HTMLSpanElement>(null);

  // Mobile overlay refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const ORIGIN = "calc(100% - 28px) 36px";

  // Keep refs in sync with state
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);


  // animateToTheme — stable via useCallback with no deps, reads from refs
  const animateToTheme = useCallback((dark: boolean) => {
    setIsDark(dark);
    isDarkRef.current = dark;
    const color = dark ? "#ffffff" : "#000000";
    gsap.to(logoRef.current, { color, duration: 0.4, ease: "power2.out" });
    gsap.to(linksContainerRef.current?.querySelectorAll("a") ?? [], { color, duration: 0.4, ease: "power2.out" });
    gsap.to(linksContainerRef.current?.querySelectorAll("span") ?? [], { backgroundColor: color, duration: 0.4, ease: "power2.out" });
    if (!menuOpenRef.current) {
      gsap.to([bar1Ref.current, bar2Ref.current, bar3Ref.current], { backgroundColor: color, duration: 0.4, ease: "power2.out" });
    }
    navBtnThemeRef.current?.animateToVariant(dark ? "ghost" : "dark");
  }, []);

  // Initial state for mobile overlay
  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: `circle(0px at ${ORIGIN})`, pointerEvents: "none" });
    gsap.set([...menuItemsRef.current, menuBtnRef.current], { opacity: 0, y: 24 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile menu open / close animation
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }

    const tl = gsap.timeline();
    const closedBarColor = isDarkRef.current ? "#ffffff" : "#000000";

    if (menuOpen) {
      gsap.set(overlayRef.current, { pointerEvents: "auto" });
      tl.to(overlayRef.current, { clipPath: `circle(150vmax at ${ORIGIN})`, duration: 0.65, ease: "power3.inOut" });
      tl.to([...menuItemsRef.current, menuBtnRef.current], { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: "power2.out" }, "-=0.3");
      tl.to(bar1Ref.current, { rotation: 45,  y:  7, backgroundColor: "#ffffff", duration: 0.3, ease: "power2.inOut" }, 0);
      tl.to(bar2Ref.current, { opacity: 0,               duration: 0.15 }, 0);
      tl.to(bar3Ref.current, { rotation: -45, y: -7, backgroundColor: "#ffffff", duration: 0.3, ease: "power2.inOut" }, 0);
    } else {
      gsap.set([...menuItemsRef.current, menuBtnRef.current], { opacity: 0, y: 24 });
      tl.to(overlayRef.current, { clipPath: `circle(0px at ${ORIGIN})`, duration: 0.5, ease: "power3.inOut", onComplete: () => gsap.set(overlayRef.current, { pointerEvents: "none" }) });
      tl.to(bar1Ref.current, { rotation: 0, y: 0, backgroundColor: closedBarColor, duration: 0.3, ease: "power2.inOut" }, 0);
      tl.to(bar2Ref.current, { opacity: 1, duration: 0.2, delay: 0.1 }, 0);
      tl.to(bar3Ref.current, { rotation: 0, y: 0, backgroundColor: closedBarColor, duration: 0.3, ease: "power2.inOut" }, 0);
    }

    return () => { tl.kill(); };
  }, [menuOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ScrollTrigger for dark sections
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    const triggers = Array.from(darkSections).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onEnter:      () => animateToTheme(true),
        onLeave:      () => animateToTheme(false),
        onEnterBack:  () => animateToTheme(true),
        onLeaveBack:  () => animateToTheme(false),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [animateToTheme]);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="flex items-center justify-between px-4 md:px-8 py-6"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {/* Logo */}
        <span
          ref={logoRef}
          className="font-dm-sans text-base font-semibold tracking-[-0.04em] capitalize"
          style={{ color: "#000000" }}
        >
          H.Studio
        </span>

        {/* Desktop links */}
        <div
          ref={linksContainerRef}
          className="hidden md:flex items-center gap-14 text-base font-semibold tracking-[-0.04em] capitalize"
          style={{ color: "#000000" }}
        >
          {navItems.map((item) => <NavLink key={item.label} item={item} />)}
        </div>

        {/* Desktop CTA */}
        <TalkButton
          ref={navBtnRef}
          themeRef={navBtnThemeRef}
          className="hidden md:flex items-center justify-center border border-black text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em] cursor-pointer"
          variant="dark"
        >
          Let&apos;s talk
        </TalkButton>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span ref={bar1Ref} className="block w-6 h-[2px]" style={{ backgroundColor: "#000000" }} />
          <span ref={bar2Ref} className="block w-6 h-[2px]" style={{ backgroundColor: "#000000" }} />
          <span ref={bar3Ref} className="block w-6 h-[2px]" style={{ backgroundColor: "#000000" }} />
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

"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
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

const TRANSITION = "color 0.4s ease, background-color 0.4s ease, border-color 0.4s ease";

function NavLink({ item, color }: { item: { label: string; href: string }; color: string }) {
  const underlineRef = useRef<HTMLSpanElement>(null);

  return (
    <a
      href={item.href}
      className="relative inline-block"
      style={{ color, transition: TRANSITION }}
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
        style={{ transform: "scaleX(0)", backgroundColor: "currentColor" }}
      />
    </a>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark]     = useState(true);

  const menuOpenRef    = useRef(false);
  const isDarkRef      = useRef(true);
  const isFirstRender  = useRef(true);

  const bar1Ref      = useRef<HTMLSpanElement>(null);
  const bar2Ref      = useRef<HTMLSpanElement>(null);
  const bar3Ref      = useRef<HTMLSpanElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuBtnRef   = useRef<HTMLButtonElement>(null);

  const ORIGIN = "calc(100% - 28px) 36px";

  const fgColor = isDark ? "#ffffff" : "#000000";

  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  const animateToTheme = useCallback((dark: boolean) => {
    setIsDark(dark);
    isDarkRef.current = dark;
    // Bars are GSAP-owned — update them here to stay in sync
    if (!menuOpenRef.current) {
      gsap.to([bar1Ref.current, bar2Ref.current, bar3Ref.current], {
        backgroundColor: dark ? "#ffffff" : "#000000",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  // Initial overlay + bar state (GSAP owns bar colors)
  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: `circle(0px at ${ORIGIN})`, pointerEvents: "none" });
    gsap.set([...menuItemsRef.current, menuBtnRef.current], { opacity: 0, y: 24 });
    gsap.set([bar1Ref.current, bar2Ref.current, bar3Ref.current], { backgroundColor: "#ffffff" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile menu animation
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }

    const tl = gsap.timeline();
    const closedBarColor = isDarkRef.current ? "#ffffff" : "#000000";

    if (menuOpen) {
      gsap.set(overlayRef.current, { pointerEvents: "auto" });
      tl.to(overlayRef.current, { clipPath: `circle(150vmax at ${ORIGIN})`, duration: 0.65, ease: "power3.inOut" });
      tl.to([...menuItemsRef.current, menuBtnRef.current], { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: "power2.out" }, "-=0.3");
      tl.to(bar1Ref.current, { rotation: 45,  y:  7, backgroundColor: "#ffffff", duration: 0.3, ease: "power2.inOut" }, 0);
      tl.to(bar2Ref.current, { opacity: 0, duration: 0.15 }, 0);
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

  // ScrollTrigger — detect dark sections
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    const triggers = Array.from(darkSections).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onEnter:     () => animateToTheme(true),
        onLeave:     () => animateToTheme(false),
        onEnterBack: () => animateToTheme(true),
        onLeaveBack: () => animateToTheme(false),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [animateToTheme]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="flex items-center justify-between px-4 md:px-8 py-6"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {/* Logo */}
        <span
          className="text-base font-semibold tracking-[-0.04em] capitalize"
          style={{ color: fgColor, transition: TRANSITION }}
        >
          H.Studio
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-14 text-base font-semibold tracking-[-0.04em] capitalize">
          {navItems.map((item) => <NavLink key={item.label} item={item} color={fgColor} />)}
        </div>

        {/* Desktop CTA */}
        <button
          className="hidden md:flex items-center justify-center text-sm font-medium px-4 py-3 rounded-3xl tracking-[-0.035em] cursor-pointer border"
          style={{ color: fgColor, borderColor: fgColor, background: "transparent", transition: TRANSITION }}
        >
          Let&apos;s talk
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span ref={bar1Ref} className="block w-6 h-[2px]" />
          <span ref={bar2Ref} className="block w-6 h-[2px]" />
          <span ref={bar3Ref} className="block w-6 h-[2px]" />
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

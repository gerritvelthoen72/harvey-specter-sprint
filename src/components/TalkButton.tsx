"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

type Variant = "dark" | "light" | "ghost";

const VARIANTS: Record<Variant, { bg: string; fill: string; fg: string; fgHover: string; border: string }> = {
  dark:  { bg: "#000000", fill: "#ffffff", fg: "#ffffff", fgHover: "#000000", border: "#000000" },
  light: { bg: "#ffffff", fill: "#000000", fg: "#000000", fgHover: "#ffffff", border: "#ffffff" },
  ghost: { bg: "transparent", fill: "#ffffff", fg: "#ffffff", fgHover: "#000000", border: "#ffffff" },
};

interface TalkButtonProps {
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
  themeRef?: React.MutableRefObject<{ animateToVariant: (v: "dark" | "light" | "ghost") => void } | null>;
}

const TalkButton = React.forwardRef<HTMLButtonElement, TalkButtonProps>(
  function TalkButton({ variant = "dark", className = "", style, onClick, children, themeRef }, forwardedRef) {
    const localRef = useRef<HTMLButtonElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) ?? localRef;
    const fillRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const currentVariant = useRef<Variant>(variant);

    const { bg, fill, fg } = VARIANTS[variant];

    useEffect(() => {
      gsap.set(fillRef.current, { scaleX: 0, transformOrigin: "left center" });
    }, []);

    useEffect(() => {
      if (!themeRef) return;
      themeRef.current = {
        animateToVariant(v) {
          currentVariant.current = v;
          const c = VARIANTS[v];
          gsap.to(ref.current, { backgroundColor: c.bg, borderColor: c.border, duration: 0.4, ease: "power2.inOut" });
          gsap.to(fillRef.current, { backgroundColor: c.fill, duration: 0.4, ease: "power2.inOut" });
          gsap.to(labelRef.current, { color: c.fg, duration: 0.4, ease: "power2.inOut" });
        },
      };
      return () => {
        themeRef.current = null;
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleEnter(e: React.MouseEvent<HTMLButtonElement>) {
      const cv = VARIANTS[currentVariant.current];
      gsap.set(fillRef.current, { transformOrigin: "left center" });
      gsap.to(fillRef.current, { scaleX: 1, duration: 0.45, ease: "power3.inOut" });
      gsap.to(labelRef.current, { color: cv.fgHover, duration: 0.25, delay: 0.1 });
      const rect = ref.current!.getBoundingClientRect();
      gsap.to(ref.current, {
        x: (e.clientX - rect.left - rect.width  / 2) * 0.25,
        y: (e.clientY - rect.top  - rect.height / 2) * 0.25,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
      const rect = ref.current!.getBoundingClientRect();
      gsap.to(ref.current, {
        x: (e.clientX - rect.left - rect.width  / 2) * 0.3,
        y: (e.clientY - rect.top  - rect.height / 2) * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    function handleLeave() {
      const cv = VARIANTS[currentVariant.current];
      gsap.set(fillRef.current, { transformOrigin: "right center" });
      gsap.to(fillRef.current, { scaleX: 0, duration: 0.35, ease: "power3.inOut" });
      gsap.to(labelRef.current, { color: cv.fg, duration: 0.2 });
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    }

    return (
      <button
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        style={{ backgroundColor: bg, ...style }}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <span ref={fillRef} className="absolute inset-0" style={{ backgroundColor: fill }} />
        <span ref={labelRef} className="relative z-10" style={{ color: fg }}>
          {children ?? "Let's talk"}
        </span>
      </button>
    );
  }
);

export default TalkButton;

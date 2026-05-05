"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PhotoBanner() {
  const imgRef     = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { filter: "blur(20px)" },
        {
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",   // begins as soon as section enters the viewport
            end: "center center",  // fully sharp when section centre hits viewport centre (~50% scrolled)
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="w-full aspect-[375/565] md:aspect-[1440/900] overflow-hidden">
      <img
        ref={imgRef}
        src="/photo-banner.jpg"
        alt=""
        className="w-full h-full object-cover object-[62%_center] md:object-center"
        style={{ willChange: "filter" }}
      />
    </section>
  );
}

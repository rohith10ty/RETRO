import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { ArrowRight, Plus } from "lucide-react";
import TopographyBackground from "./TopographyBackground";

gsap.registerPlugin(CustomEase);
try {
  CustomEase.create("fluidEase", ".87, 0, .13, 1");
  CustomEase.create("hop", "0.8, 0, 0.2, 1");
} catch (e) {
  // fallback if already registered
}

export default function HeroRetro({ onLoaded }) {
  const containerRef = useRef(null);
  const heroStageRef = useRef(null);
  const loaderInfoRef = useRef(null);
  const counterRef = useRef(null);
  const innerWrapRef = useRef(null);
  const shoesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroStageRef.current;
      const loaderInfo = loaderInfoRef.current;
      const innerWrap = innerWrapRef.current;
      const shoes = shoesRef.current;

      // Initial preloader setup: slit mathematically centered at 50%
      gsap.set(hero, {
        clipPath: "polygon(0% 48.5%, 0% 48.5%, 0% 51.5%, 0% 51.5%)",
      });

      gsap.set(innerWrap, {
        scale: 1.04,
        opacity: 0.8,
      });

      gsap.set(".hero-fade-item", {
        opacity: 0,
        y: 18,
      });

      gsap.set(".hero-reveal-char", {
        y: "140%",
      });

      gsap.set(shoes, {
        opacity: 0,
        scale: 0.9,
        y: 25,
      });

      const tl = gsap.timeline({ delay: 0.15 });

      // Step 1: Initial slit on the left centered vertically at 50%
      tl.to(hero, {
        clipPath: "polygon(0% 48.5%, 25% 48.5%, 25% 51.5%, 0% 51.5%)",
        duration: 0.9,
        ease: "fluidEase",
      });

      // Step 2: Expand horizontally while counting 0 -> 100
      tl.to(hero, {
        clipPath: "polygon(0% 48.5%, 100% 48.5%, 100% 51.5%, 0% 51.5%)",
        duration: 1.6,
        ease: "fluidEase",
        onStart: () => {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: 100,
            duration: 1.6,
            ease: "fluidEase",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = Math.round(counterObj.val);
              }
            },
          });
        },
      });

      // Step 3: Expand vertically to 100% full screen
      tl.to(hero, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.1,
        ease: "fluidEase",
        onStart: () => {
          if (onLoaded) onLoaded();
          gsap.to(innerWrap, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "fluidEase",
          });
          gsap.to(loaderInfo, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });

      // Step 4: Stagger reveal the RETRO letters
      tl.to(
        ".hero-reveal-char",
        {
          y: "0%",
          duration: 0.9,
          ease: "hop",
          stagger: { each: 0.06, from: "start" },
        },
        "-=0.5",
      );

      // Step 5: Reveal centered shoes on the right
      tl.to(
        shoes,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "hop",
        },
        "-=0.7",
      );

      // Step 6: Reveal editorial typography, buttons, coordinates, and footer badge
      tl.to(
        ".hero-fade-item",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "hop",
          stagger: 0.04,
        },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-black text-white select-none"
    >
      {/* ============================================================
          AUDIX FLUID INTERACTIVE COUNTER & LOADER INFO (DEAD CENTER)
          ============================================================ */}
      <div
        ref={loaderInfoRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-xs sm:text-sm tracking-[0.28em] uppercase text-white mix-blend-difference flex items-center justify-center gap-2.5 font-mono font-bold leading-none pointer-events-none"
      >
        <span>LOADING</span>
        <span>/</span>
        <span ref={counterRef} className="tabular-nums min-w-[2.5ch]">
          0
        </span>
      </div>

      {/* ============================================================
          FLUID EXPANDING HERO STAGE (CLIPPED CONTAINER AT EXACT 50%)
          ============================================================ */}
      <div
        ref={heroStageRef}
        className="relative w-full h-full overflow-hidden bg-[#e0e2db] text-[#141414] will-change-[clip-path]"
        style={{
          clipPath: "polygon(0% 48.5%, 0% 48.5%, 0% 51.5%, 0% 51.5%)",
        }}
      >
        {/* Full-coverage Topographic Fluid Background covering all corners */}
        <TopographyBackground
          speed={0.02}
          scale={2.4}
          lineThickness={0.03}
          lineOpacity={0.24}
        />

        {/* ============================================================
            MAIN EDITORIAL CONTENT CONTAINER
            ============================================================ */}
        <div
          ref={innerWrapRef}
          className="relative z-20 w-full h-full flex flex-col justify-center pt-14 sm:pt-16 md:pt-18 pb-14 sm:pb-16 md:pb-18 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 max-w-[1920px] mx-auto will-change-transform"
        >
          {/* ============================================================
              CENTER 2-COLUMN VIEW: LEFT CONTENT & ENLARGED RIGHT SNEAKERS
              ============================================================ */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-6 xl:gap-8 items-center my-auto">
            {/* LEFT COLUMN: TITLE, SUBTITLE, DESCRIPTION & BUTTONS */}
            <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pointer-events-auto px-2 sm:px-4 lg:pl-4 xl:pl-8 z-10">
              {/* Top Tag: AIR HERITAGE • 2026 */}
              <div className="hero-fade-item flex items-center justify-center lg:justify-start gap-2.5 mb-1.5 sm:mb-2 xl:mb-3">
                <span className="text-[9px] sm:text-[10.5px] lg:text-[10px] xl:text-[11.5px] font-mono tracking-[0.28em] uppercase text-neutral-600 font-semibold">
                  AIR HERITAGE &bull; 2026
                </span>
                <span className="w-8 sm:w-14 lg:w-16 xl:w-20 h-[1px] bg-neutral-400/60 inline-block" />
              </div>

              {/* Main Headline: RETRO */}
              <div className="overflow-hidden py-0.5">
                <h1 className="font-impact uppercase font-black text-[clamp(3.8rem,14vw,6.5rem)] lg:text-[7.4rem] xl:text-[9.8rem] 2xl:text-[11.2rem] leading-[0.86] tracking-[-0.04em] text-[#141414] drop-shadow-sm flex items-center justify-center lg:justify-start">
                  {["R", "E", "T", "R", "O"].map((char, index) => (
                    <span
                      key={index}
                      className="inline-block overflow-hidden py-1"
                    >
                      <span className="hero-reveal-char inline-block translate-y-[140%] will-change-transform pr-0.5 sm:pr-1.5 xl:pr-2.5">
                        {char}
                      </span>
                    </span>
                  ))}
                </h1>
              </div>

              {/* Subtitle: CURATED ICONS FROM THE ARCHIVE */}
              <h2 className="hero-fade-item text-[9.5px] sm:text-[11px] lg:text-[11px] xl:text-[13px] tracking-[0.28em] font-mono font-bold uppercase text-[#141414] mt-2 sm:mt-2.5 xl:mt-3.5">
                CURATED ICONS FROM THE ARCHIVE
              </h2>

              {/* Description Text */}
              <p className="hero-fade-item text-[11.5px] sm:text-[13px] lg:text-[12.5px] xl:text-[14.5px] text-neutral-600 font-normal leading-relaxed mt-2 sm:mt-2.5 xl:mt-3.5 max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] mx-auto lg:mx-0">
                Timeless silhouettes. Rare drops.
                <br />
                Designed for collectors.
              </p>

              {/* Action Buttons: EXPLORE ARCHIVE & VIEW COLLECTION */}
              <div className="hero-fade-item flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 xl:gap-4 mt-4 sm:mt-5 xl:mt-6">
                {/* Primary Black Pill Button */}
                <a
                  href="#selector"
                  className="group relative inline-flex items-center gap-2 px-4.5 sm:px-6 lg:px-6 xl:px-7 py-2.5 sm:py-3 lg:py-3 xl:py-3.5 bg-[#141414] text-white rounded-full font-mono text-[9px] sm:text-[10.5px] lg:text-[10px] xl:text-[11.5px] tracking-[0.2em] uppercase font-semibold hover:bg-neutral-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
                >
                  <span>EXPLORE ARCHIVE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                {/* Secondary Outline Button */}
                <a
                  href="#lookbook"
                  className="inline-flex items-center px-4.5 sm:px-6 lg:px-6 xl:px-7 py-2.5 sm:py-3 lg:py-3 xl:py-3.5 bg-transparent border border-neutral-400/80 hover:border-[#141414] text-[#141414] rounded-full font-mono text-[9px] sm:text-[10.5px] lg:text-[10px] xl:text-[11.5px] tracking-[0.2em] uppercase font-semibold hover:bg-black/5 transition-all duration-300 cursor-pointer"
                >
                  <span>VIEW COLLECTION</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: SNEAKERS (PERFECTLY DEAD CENTERED ON MOBILE, SHIFTED/ENLARGED ON DESKTOPS) */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-start relative pointer-events-none mt-12 sm:mt-16 lg:mt-0 lg:-translate-x-12 xl:-translate-x-16">
              <div className="w-full flex items-center justify-center">
                <div
                  ref={shoesRef}
                  className="relative w-full max-w-[380px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[1100px] xl:max-w-[1280px] 2xl:max-w-[1440px] scale-110 sm:scale-115 lg:scale-130 xl:scale-135 2xl:scale-140 will-change-transform flex items-center justify-center mx-auto"
                >
                  {/* Direction Coordinates Badge (Centered on mobile, top-right on desktop) */}
                  <div className="absolute -top-5 sm:-top-6 lg:top-3 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-4 xl:-right-6 z-30 pointer-events-auto">
                    <div className="hero-fade-item flex items-center gap-1.5 sm:gap-2 text-neutral-600 font-mono text-[8px] sm:text-[9.5px] lg:text-[10px] xl:text-[11px] tracking-[0.2em] uppercase bg-black/5 px-2.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-black/10 backdrop-blur-sm shadow-sm whitespace-nowrap">
                      <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-500 stroke-[1.8]" />
                      <div className="flex items-center gap-1 leading-none">
                        <span>35.6762° N</span>
                        <span className="text-neutral-400">&bull;</span>
                        <span>139.6503° E</span>
                      </div>
                    </div>
                  </div>

                  {/* Deep Multi-Layer Ground Ambient Shadows */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[92%] h-14 sm:h-20 lg:h-32 bg-black/35 blur-2xl sm:blur-3xl rounded-[100%] scale-y-35 -z-10" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-10 sm:h-14 lg:h-22 bg-black/45 blur-lg sm:blur-xl rounded-[100%] scale-y-25 -z-10" />

                  {/* High-Resolution Standalone Transparent Sneakers with Rich Contact Shadow */}
                  <img
                    src="/hero-assets/rock_shoes_cutout.png"
                    alt="Air Jordan 4 Fire Red and Nike Dunk Black"
                    className="w-full h-auto object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.36)] lg:drop-shadow-[0_36px_56px_rgba(0,0,0,0.40)] drop-shadow-[0_50px_90px_rgba(0,0,0,0.24)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              BOTTOM HERO FOOTER: ABSOLUTE CENTERED SLEEK GLOBE BADGE
              (PERFECTLY POSITIONED AND VISIBLE ACROSS ALL LAPTOPS)
              ============================================================ */}
          <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <div className="hero-fade-item flex items-center gap-2 bg-black/[0.05] px-3 py-1 sm:px-3.5 sm:py-1 rounded-full border border-black/10 backdrop-blur-sm shadow-sm">
              {/* SVG Wireframe Globe */}
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 text-red-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>

              <div className="font-mono text-[7.5px] sm:text-[8px] md:text-[8.5px] tracking-[0.24em] uppercase leading-none text-neutral-800 font-semibold flex items-center gap-1.5 sm:gap-2">
                <span>FOOTWEAR ARCHIVE</span>
                <span className="text-neutral-400">&bull;</span>
                <span className="text-neutral-600 font-medium">
                  CULTURE &times; HERITAGE
                </span>
                <span className="text-neutral-400 hidden sm:inline">
                  &bull;
                </span>
                <span className="text-neutral-500 font-medium hidden sm:inline">
                  GLOBAL COLLECTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

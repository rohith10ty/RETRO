import React from "react";
import { ShieldCheck, Eye, Lock, Award, Compass, ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      num: "01",
      title: "100% PROVENANCE AUTHENTICATION",
      desc: "Every pair in the archive undergoes an exhaustive multi-point verification protocol. UV-spectrometry, stitching density analysis, and factory serial matching guarantee uncompromised legitimacy.",
      icon: ShieldCheck,
    },
    {
      num: "02",
      title: "CLIMATE-CONTROLLED VAULT",
      desc: "Stored in sealed, dark-vault microclimates at 18°C and 45% relative humidity to prevent polyurethane oxidation, midsole crumbling, and hue degradation for centuries.",
      icon: Lock,
    },
    {
      num: "03",
      title: "GLOBAL SOURCING NETWORK",
      desc: "Private collectors, pro athletes, and secret estate sales across Tokyo, London, and New York. If a silhouette made sneaker history, our team locates and secures it.",
      icon: Compass,
    },
    {
      num: "04",
      title: "BESPOKE CURATION & PACKAGING",
      desc: "Delivered in laser-engraved acrylic exhibition cases with serialized certificates of authenticity, archival cotton gloves, and tamper-proof holographic NFC tags.",
      icon: Award,
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full pt-8 sm:pt-10 pb-20 sm:pb-28 px-6 sm:px-10 md:px-16 bg-[#e0e2db] text-[#141414] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section Pre-header */}
        <div className="flex items-center gap-3 text-neutral-500 font-mono text-[11px] tracking-[0.28em] uppercase mb-4">
          <Eye className="w-3.5 h-3.5 text-red-600" />
          <span>04 ARCHIVE PHILOSOPHY</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-impact text-4xl sm:text-6xl md:text-7xl xl:text-8xl uppercase font-black tracking-[-0.03em] leading-[0.92]">
              WE DO NOT SELL SHOES.
              <br />
              <span className="text-neutral-500">WE ARCHIVE CULTURE.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2">
            <p className="font-mono text-xs sm:text-sm text-neutral-700 leading-relaxed uppercase tracking-wider">
              ESTABLISHED AS A LIVING MUSEUM OF INDUSTRIAL SNEAKER DESIGN. RETRO UNITES HISTORIC DESIGN MASTERY WITH IMMUTABLE AUTHENTICATION FOR SERIOUS COLLECTORS GLOBALLY.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              <span>VAULT ID // 2026-X</span>
              <span>&bull;</span>
              <span>35.6762° N, 139.6503° E</span>
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative bg-white/40 hover:bg-white/80 backdrop-blur-md rounded-2xl p-7 border border-black/10 hover:border-black/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-red-600 transition-colors">
                      [{pillar.num}]
                    </span>
                    <div className="p-2.5 rounded-full bg-black/5 group-hover:bg-[#141414] group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-impact text-xl sm:text-2xl uppercase tracking-tight text-[#141414] mb-3 leading-none">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  <span>AUTHENTICITY GUARANTEE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-[#141414] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left">
            <p className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase mb-1">
              THE RETRO STANDARD
            </p>
            <h3 className="font-impact text-2xl sm:text-4xl uppercase tracking-tight">
              PRECISION ARCHIVAL METRICS
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 text-center">
            <div>
              <p className="font-impact text-3xl sm:text-5xl text-red-500">500+</p>
              <p className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest mt-1">
                VERIFIED GRAILS
              </p>
            </div>
            <div>
              <p className="font-impact text-3xl sm:text-5xl text-white">0%</p>
              <p className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest mt-1">
                AUTHENTICITY COMPROMISE
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-impact text-3xl sm:text-5xl text-neutral-300">24/7</p>
              <p className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest mt-1">
                PRIVATE CONCIERGE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

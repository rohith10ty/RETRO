import React from "react";
import { ArrowUp, Sparkles } from "lucide-react";

export default function FooterRetro() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "01 HERO", href: "#hero" },
    { name: "02 SELECTOR", href: "#selector" },
    { name: "03 ARCHIVE (36 PIECES)", href: "#collection" },
    { name: "04 ABOUT", href: "#about" },
    { name: "05 CONTACT", href: "#contact" },
  ];

  const socialLinks = [
    { name: "INSTAGRAM", href: "https://instagram.com" },
    { name: "DISCORD // VAULT", href: "https://discord.com" },
    { name: "TWITTER / X", href: "https://x.com" },
    { name: "YOUTUBE ARCHIVE", href: "https://youtube.com" },
  ];

  return (
    <footer className="relative w-full bg-[#141414] text-white pt-24 pb-16 px-6 sm:px-10 md:px-16 border-t border-white/10 select-none">
      <div className="max-w-[1800px] mx-auto">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] tracking-[0.28em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FOOTWEAR ARCHIVE // EST. 2026</span>
            </div>
            <h3 className="font-impact text-3xl sm:text-5xl uppercase tracking-tight text-white">
              PRESERVING FOOTWEAR HISTORY.
            </h3>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white hover:text-black transition-all duration-300 font-mono text-[10px] tracking-[0.2em] uppercase font-semibold cursor-pointer border border-white/20"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Links & Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-16 border-b border-white/10 font-mono text-xs">
          {/* Col 1: Brand & Manifesto */}
          <div className="lg:col-span-4">
            <h4 className="font-impact text-2xl uppercase tracking-tight text-white mb-4">
              RETRO ARCHIVE
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-[340px] font-sans">
              A curated physical and digital repository of the most culturally significant sneakers in modern design history.
            </p>
            <div className="mt-6 text-[10px] text-neutral-500 tracking-widest uppercase">
              <span>LOCATION: TOKYO &bull; NEW YORK &bull; PARIS</span>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="lg:col-span-3">
            <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase font-bold mb-4">
              INDEX MAP
            </p>
            <ul className="space-y-2.5 text-neutral-300 text-xs">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-red-400 transition-colors tracking-widest inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Channels */}
          <div className="lg:col-span-3">
            <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase font-bold mb-4">
              CHANNELS
            </p>
            <ul className="space-y-2.5 text-neutral-300 text-xs">
              {socialLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-red-400 transition-colors tracking-widest inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Vault Encryption Code */}
          <div className="lg:col-span-2">
            <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase font-bold mb-4">
              PROTOCOL
            </p>
            <p className="text-[10px] text-neutral-400 leading-relaxed uppercase">
              SHA-256 PROVENANCE
              <br />
              NFC SECURE TAGS
              <br />
              ARCHIVAL GRADE
            </p>
            <div className="mt-4 inline-block px-2.5 py-1 rounded bg-white/10 text-emerald-400 text-[9px] tracking-widest uppercase">
              SYSTEM ONLINE
            </div>
          </div>
        </div>

        {/* Gigantic Watermark Typography */}
        <div className="py-12 overflow-hidden select-none pointer-events-none text-center">
          <span className="font-impact uppercase font-black text-[clamp(4.5rem,18vw,16rem)] leading-none tracking-[-0.04em] text-white/[0.04] block">
            RETRO
          </span>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest pt-6">
          <p>&copy; {new Date().getFullYear()} RETRO FOOTWEAR ARCHIVE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-300 transition-colors">TERMS</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">AUTHENTICITY</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">PRIVACY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

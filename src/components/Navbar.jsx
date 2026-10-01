import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar({
  isLoaded = true,
  isFocusMode = false,
  onOpenSearch,
  onOpenBag,
  cartCount = 1,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "SELECTOR", href: "#selector" },
    { name: "COLLECTION", href: "#collection" },
    { name: "ABOUT", href: "#about" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`absolute top-0 left-0 w-full z-40 transition-all duration-500 ease-out bg-transparent py-5 sm:py-6 text-[#141414] ${
          !isLoaded || isFocusMode
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 md:px-14 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-2xl sm:text-3xl font-black tracking-[-0.04em] uppercase transition-colors text-[#141414] hover:opacity-75 drop-shadow-sm"
            >
              RETRO
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9 text-xs tracking-[0.24em] uppercase font-semibold">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.href.replace("#", "");
                  const target = document.getElementById(id);
                  if (target) {
                    window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
                  }
                }}
                className="relative py-1 transition-colors text-[#141414]/90 hover:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:bg-black cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs tracking-wider uppercase font-medium">
            {/* Search Trigger */}
            <button
              onClick={() => onOpenSearch && onOpenSearch()}
              aria-label="Search collection"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-md bg-black/10 border border-black/15 text-[#141414] hover:bg-black/15 hover:scale-105 active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-[11px] tracking-widest font-mono font-medium">
                Search
              </span>
            </button>

            {/* Bag Trigger (Visible only on desktop & tablet, accessible in hamburger on mobile) */}
            <button
              onClick={() => onOpenBag && onOpenBag()}
              aria-label="View shopping bag"
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-md bg-black/10 border border-black/15 text-[#141414] hover:bg-black/15 hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[11px] font-mono font-medium">Bag ({cartCount})</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full border transition-all cursor-pointer bg-black/10 border-black/15 text-[#141414]"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Click-Anywhere-to-Close and Dedicated Close Button */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-[#0f0e0e]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 pt-6 text-white lg:hidden animate-fadeIn"
        >
          {/* Header row inside Mobile Menu: Logo & Explicit Close Button */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <span className="text-2xl font-black tracking-[-0.04em] uppercase text-white">
              RETRO
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Trigger inside Mobile Hamburger */}
          <div className="my-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(false);
                if (onOpenSearch) onOpenSearch();
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-neutral-400" />
                <span className="font-mono text-xs tracking-widest uppercase font-semibold text-neutral-300">
                  Search Sneakers...
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">FIND</span>
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-3 text-base sm:text-lg font-light tracking-[0.25em] uppercase my-auto py-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const id = link.href.replace("#", "");
                  const target = document.getElementById(id);
                  if (target) {
                    window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
                  }
                }}
                className="hover:text-red-400 transition-colors border-b border-white/10 pb-2.5 flex items-center justify-between group cursor-pointer"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}

            {/* Mobile Bag Option inside Hamburger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(false);
                if (onOpenBag) onOpenBag();
              }}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/10 border border-white/15 text-white mt-1 cursor-pointer hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-red-400" />
                <span className="font-mono text-xs tracking-widest uppercase font-semibold">Shopping Bag</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-[10px] font-mono font-bold">{cartCount} ITEMS</span>
            </button>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-1.5 text-[10px] tracking-widest text-neutral-400 uppercase font-mono">
            <p>RETRO FOOTWEAR ARCHIVE</p>
            <p>&copy; 2026 ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      )}
    </>
  );
}

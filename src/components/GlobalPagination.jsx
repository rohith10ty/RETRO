import React, { useState, useEffect } from "react";

export default function GlobalPagination({ isLoaded = true, isFocusMode = false }) {
  const [activeSection, setActiveSection] = useState("01");
  const [isDark, setIsDark] = useState(false);

  const sections = [
    { num: "01", id: "hero", label: "HERO" },
    { num: "02", id: "selector", label: "SELECTOR" },
    { num: "03", id: "collection", label: "ARCHIVE" },
    { num: "04", id: "about", label: "ABOUT" },
    { num: "05", id: "contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      const heroElem = document.getElementById("hero");
      const selectorElem = document.getElementById("selector");
      const collectionElem = document.getElementById("collection");
      const aboutElem = document.getElementById("about");
      const contactElem = document.getElementById("contact");
      const footerElem = document.querySelector("footer");

      const positions = [
        { id: "hero", num: "01", top: heroElem ? heroElem.offsetTop : 0 },
        { id: "selector", num: "02", top: selectorElem ? selectorElem.offsetTop : window.innerHeight },
        { id: "collection", num: "03", top: collectionElem ? collectionElem.offsetTop : window.innerHeight * 2 },
        { id: "about", num: "04", top: aboutElem ? aboutElem.offsetTop : window.innerHeight * 3 },
        { id: "contact", num: "05", top: contactElem ? contactElem.offsetTop : window.innerHeight * 4 },
      ];

      for (let i = positions.length - 1; i >= 0; i--) {
        if (scrollPosition >= positions[i].top) {
          setActiveSection(positions[i].num);
          break;
        }
      }

      // Automatically switch pill styling when entering dark sections (such as Footer)
      if (footerElem) {
        const footerTop = footerElem.offsetTop;
        const currentMid = window.scrollY + window.innerHeight * 0.5;
        setIsDark(currentMid >= footerTop - 60);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id, sectionNumber) => {
    setActiveSection(sectionNumber);
    if (sectionNumber === "01") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const target = document.getElementById(id);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { duration: 1.2, offset: 0 });
        } else {
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        }
      }
    }
  };

  if (!isLoaded) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "18px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
      }}
      className={`select-none hidden md:flex transition-opacity duration-300 ${
        isFocusMode ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      <aside
        aria-label="Section navigation"
        className={`flex flex-col items-center gap-0.5 px-1.5 py-2.5 rounded-full backdrop-blur-md border shadow-md transition-all duration-300 ${
          isDark
            ? "bg-white/10 border-white/20 text-white shadow-black/40"
            : "bg-black/[0.06] hover:bg-black/[0.09] border-black/10 text-[#141414]"
        }`}
      >
        {sections.map((sec, idx) => {
          const isActive = activeSection === sec.num;
          return (
            <React.Fragment key={sec.num}>
              {idx > 0 && (
                <div
                  className={`w-[1px] transition-all duration-300 ${
                    isActive || activeSection === sections[idx - 1].num
                      ? "h-2 bg-red-600"
                      : isDark
                      ? "h-1.5 bg-white/25"
                      : "h-1.5 bg-neutral-300/80"
                  }`}
                />
              )}
              <button
                onClick={() => scrollToSection(sec.id, sec.num)}
                aria-label={`Scroll to section ${sec.num} - ${sec.label}`}
                title={`Section ${sec.num}: ${sec.label}`}
                className={`font-mono transition-all duration-200 cursor-pointer px-1 py-0.5 leading-none ${
                  isActive
                    ? isDark
                      ? "text-white font-bold text-[9.5px] scale-110 drop-shadow-sm"
                      : "text-[#141414] font-bold text-[9.5px] scale-110"
                    : isDark
                    ? "text-neutral-400 hover:text-white font-medium text-[8.5px]"
                    : "text-neutral-400 hover:text-neutral-800 font-medium text-[8.5px]"
                }`}
              >
                {sec.num}
              </button>
            </React.Fragment>
          );
        })}
      </aside>
    </div>
  );
}

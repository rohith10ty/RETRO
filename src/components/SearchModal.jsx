import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ShoppingBag, ArrowUpRight, Sparkles } from "lucide-react";
import nikeShoesData from "../data/nikeShoes.json";

export default function SearchModal({ isOpen, onClose, onAddToCart }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const filteredShoes = useMemo(() => {
    return nikeShoesData.filter((shoe) => {
      const matchesSearch =
        shoe.title.toLowerCase().includes(query.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(query.toLowerCase()) ||
        shoe.category.toLowerCase().includes(query.toLowerCase()) ||
        (shoe.price && shoe.price.toLowerCase().includes(query.toLowerCase()));

      if (!matchesSearch) return false;

      if (activeFilter === "all") return true;
      if (activeFilter === "jordan") return shoe.category === "jordan";
      if (activeFilter === "dunk") return shoe.category === "dunk";
      if (activeFilter === "budget") return (shoe.priceRaw || 0) <= 15000;
      return true;
    });
  }, [query, activeFilter]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xl"
          />

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#0f0e0e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Header / Input Row */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <Search className="w-5 h-5 text-neutral-400 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search archive (e.g. Dunk Low, Jordan 4, Black Cat)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-neutral-500 font-mono tracking-wider focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "All Items" },
                { id: "jordan", label: "Air Jordans" },
                { id: "dunk", label: "Dunks" },
                { id: "budget", label: "Under ₹15,000" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1 rounded-full font-mono text-[10.5px] tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === filter.id
                      ? "bg-white text-black font-bold shadow-sm"
                      : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 mt-1 custom-scrollbar">
              {filteredShoes.length === 0 ? (
                <div className="py-14 text-center text-neutral-500 font-mono text-xs">
                  <p>No sneaker found matching "{query}"</p>
                  <p className="text-[10px] mt-1 text-neutral-600">Try searching "Jordan", "Dunk", or "Travis"</p>
                </div>
              ) : (
                filteredShoes.map((shoe) => (
                  <div
                    key={shoe.id}
                    className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0">
                        <img
                          src={shoe.image_url}
                          alt={shoe.title}
                          className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors">
                          {shoe.title}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-mono text-neutral-400 font-semibold mt-0.5">
                          {shoe.price} &bull; <span className="uppercase text-neutral-500">{shoe.category}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <button
                        onClick={() => {
                          if (onAddToCart) onAddToCart(shoe);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 bg-white text-black hover:bg-neutral-200 rounded-full font-mono text-[10.5px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              <span>{filteredShoes.length} PIECES FOUND</span>
              <span>PRESS ESC TO CLOSE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

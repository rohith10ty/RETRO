import React, { useState } from "react";
import { Sparkles, ShoppingBag, LayoutGrid, LayoutList } from "lucide-react";
import nikeShoesData from "../data/nikeShoes.json";
import ProductDetailModal from "./ProductDetailModal";

const TAGS = ["VAULT", "GRAIL", "ICONIC", "ARCHIVE", "OG", "RARE", "LIMITED", "HERITAGE"];

export default function FeaturedArchive({ onAddToCart }) {
  const [filter, setFilter] = useState("all");
  const [modalShoe, setModalShoe] = useState(null);
  const [mobileCols, setMobileCols] = useState(2); // 2 products per row on mobile by default

  // Retrieve full 36 shoes list from dataset
  const all36Shoes = nikeShoesData.slice(0, 36).map((shoe, idx) => {
    const formattedNum = String(idx + 1).padStart(2, "0");
    const tag = TAGS[idx % TAGS.length];
    const categoryName =
      shoe.category === "dunk"
        ? "SB Dunk Low"
        : shoe.category === "jordan"
        ? "Air Jordan"
        : "Nike Archive";
    return {
      ...shoe,
      listingId: formattedNum,
      tag,
      categoryName,
      year: shoe.year || "ARCHIVE",
    };
  });

  const filteredShoes =
    filter === "all"
      ? all36Shoes
      : all36Shoes.filter((shoe) => {
          if (filter === "jordan") return shoe.category === "jordan" || shoe.title.toLowerCase().includes("jordan");
          if (filter === "dunk") return shoe.category === "dunk" || shoe.title.toLowerCase().includes("dunk");
          if (filter === "grail") return shoe.tag === "GRAIL" || shoe.tag === "VAULT";
          return true;
        });

  return (
    <section
      id="collection"
      className="relative w-full pt-8 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-10 md:px-16 bg-[#e0e2db] text-[#141414] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-14">
          <div>
            <div className="flex items-center gap-2.5 text-neutral-500 font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>03 THE COMPLETE VAULT ARCHIVE &bull; 36 PIECES</span>
            </div>
            <h2 className="font-impact text-3xl sm:text-6xl md:text-7xl xl:text-8xl uppercase font-black tracking-[-0.03em] leading-none">
              CURATED SELECTION
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4">
            {/* Filter Tabs: Expanded Width, Single-line Text, Clean & Neat */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-black/[0.06] rounded-full border border-black/10 backdrop-blur-md shadow-sm overflow-x-auto max-w-full">
              {[
                { id: "all", label: "ALL (36)" },
                { id: "jordan", label: "AIR JORDANS" },
                { id: "dunk", label: "NIKE DUNKS" },
                { id: "grail", label: "GRAILS & VAULT" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-mono text-[9.5px] sm:text-[11px] tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    filter === tab.id
                      ? "bg-[#141414] text-white shadow-sm font-bold"
                      : "text-neutral-700 hover:text-black hover:bg-black/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Layout Option Toggle (1-Col vs 2-Col View for Mobile Only) */}
            <div className="flex sm:hidden items-center gap-1 p-1 bg-black/[0.06] rounded-full border border-black/10">
              <button
                type="button"
                onClick={() => setMobileCols(1)}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  mobileCols === 1
                    ? "bg-[#141414] text-white shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
                aria-label="1 product per row"
                title="1 Product per row"
              >
                <LayoutList className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileCols(2)}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  mobileCols === 2
                    ? "bg-[#141414] text-white shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
                aria-label="2 products per row"
                title="2 Products per row"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 font-mono max-w-[280px] leading-relaxed hidden 2xl:block">
              Every silhouette authenticated with UV & multi-point provenance.
            </p>
          </div>
        </div>

        {/* Sneaker Grid: 2 Products in Row for Mobile by Default (or 1 on toggle) */}
        <div
          className={`grid ${
            mobileCols === 1 ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7`}
        >
          {filteredShoes.map((shoe) => (
            <div
              key={shoe.id ?? shoe.listingId}
              onClick={() => setModalShoe(shoe)}
              className="group relative bg-white/40 hover:bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-black/10 hover:border-black/25 shadow-sm transition-colors duration-300 flex flex-col justify-between cursor-pointer overflow-hidden select-none"
            >
              {/* Top Tag & ID */}
              <div className="relative z-10 flex items-center justify-between text-[8.5px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2 sm:mb-3">
                <span className="font-bold text-neutral-400 group-hover:text-red-600 transition-colors">
                  [{shoe.listingId}]
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-black/5 text-[#141414] font-semibold border border-black/10 text-[8px] sm:text-[9px] tracking-wider">
                  {shoe.tag}
                </span>
              </div>

              {/* ============================================================
                  SNEAKER IMAGE CONTAINER WITH PURE WHITE SPECULAR SHINE
                  (NO MOVEMENT, NO ROTATION, ONLY WHITE SHINE SWEEP ON HOVER)
                  ============================================================ */}
              <div className="relative w-full h-[120px] sm:h-[195px] flex items-center justify-center my-2 sm:my-3 overflow-hidden rounded-lg sm:rounded-xl">
                {/* Pure White Specular Light Gleam Sweep Across the Shoe */}
                <div
                  className="absolute -inset-full w-[250%] h-[250%] opacity-0 group-hover:opacity-100 pointer-events-none z-20 transform -rotate-45 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 25%, rgba(255,255,255,0.85) 48%, rgba(255,255,255,1.0) 50%, rgba(255,255,255,0.85) 52%, rgba(255,255,255,0.0) 75%, transparent 100%)",
                    mixBlendMode: "overlay",
                  }}
                />

                <div
                  className="absolute -inset-full w-[250%] h-[250%] opacity-0 group-hover:opacity-80 pointer-events-none z-20 transform -rotate-45 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.7) 50%, transparent 70%)",
                    mixBlendMode: "screen",
                  }}
                />

                {/* Static Shoe Image (Zero movement, zero rotation on hover) */}
                <img
                  src={shoe.image_url || shoe.image}
                  alt={shoe.title || shoe.name}
                  loading="lazy"
                  className="relative z-10 w-full h-auto max-h-[105px] sm:max-h-[160px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] sm:drop-shadow-[0_12px_22px_rgba(0,0,0,0.22)] filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>

              {/* Bottom Details & Add to Bag Trigger */}
              <div className="relative z-10 pt-2 sm:pt-4 border-t border-black/10 flex items-end justify-between gap-1">
                <div className="pr-1 overflow-hidden">
                  <p className="text-[8px] sm:text-[9.5px] font-mono tracking-wider text-neutral-500 uppercase truncate">
                    {shoe.categoryName} &bull; {shoe.brand || "Nike"}
                  </p>
                  <h3 className="text-[11px] sm:text-[13.5px] font-bold text-[#141414] tracking-tight mt-0.5 line-clamp-1 leading-snug">
                    {shoe.title || shoe.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-mono font-bold text-neutral-900 mt-0.5 sm:mt-1">
                    {shoe.price}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddToCart) onAddToCart(shoe);
                  }}
                  className="p-1.5 sm:p-2.5 rounded-full bg-[#141414] text-white group-hover:bg-red-600 transition-all duration-300 cursor-pointer shadow-md hover:scale-110 active:scale-95 flex-shrink-0"
                  aria-label="Add to bag"
                  title="Add to Shopping Bag"
                >
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dedicated Compact Product Detail Card Modal */}
      <ProductDetailModal
        shoe={modalShoe}
        isOpen={!!modalShoe}
        onClose={() => setModalShoe(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
}

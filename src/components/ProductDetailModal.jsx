import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ShieldCheck, Sparkles, Check } from "lucide-react";

export default function ProductDetailModal({ shoe, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("US 10");

  // Determine gender classification based on shoe title and attributes
  const titleLower = (shoe?.title || shoe?.name || "").toLowerCase();
  const isWomens =
    titleLower.includes("wmns") ||
    titleLower.includes("women") ||
    titleLower.includes("girls");
  const isJunior =
    titleLower.includes("ps") ||
    titleLower.includes("gs") ||
    titleLower.includes("kids");

  const genderLabel = isWomens
    ? "WOMEN'S EXCLUSIVE"
    : isJunior
    ? "JUNIOR / GS SIZING"
    : "UNISEX • MEN'S SIZING";

  const sizes = isWomens
    ? ["US 5", "US 5.5", "US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10"]
    : isJunior
    ? ["US 3.5Y", "US 4Y", "US 4.5Y", "US 5Y", "US 5.5Y", "US 6Y", "US 6.5Y", "US 7Y"]
    : ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12"];

  // Reset selected size when shoe changes
  useEffect(() => {
    if (isWomens) setSelectedSize("US 7.5");
    else if (isJunior) setSelectedSize("US 5Y");
    else setSelectedSize("US 10");
  }, [shoe, isWomens, isJunior]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !shoe) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        ...shoe,
        selectedSize,
        genderLabel,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Dedicated Compact Product Card (Fits perfectly on laptop screens with NO internal scroll) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: "spring", damping: 28, stiffness: 380 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[820px] bg-[#f2f3ef] text-[#141414] rounded-3xl border border-black/15 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close product view"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/5 hover:bg-[#141414] hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* LEFT COLUMN: Shoe Image Studio Display */}
            <div className="md:col-span-6 bg-gradient-to-b from-[#e5e7e0] to-[#dbded5] p-6 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-black/10">
              {/* Top Tag & Condition */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-[9.5px] font-mono font-bold tracking-widest text-neutral-600 uppercase">
                  {shoe.tag || "VAULT PIECE"}
                </span>
                <span className="text-[9.5px] font-mono tracking-widest text-neutral-500 uppercase">
                  ID: #{shoe.listingId || shoe.id}
                </span>
              </div>

              {/* Main Silhouette with Subtle Specular Sheen */}
              <div className="relative my-4 py-2 flex items-center justify-center">
                <div className="absolute w-44 h-44 rounded-full bg-white/40 blur-2xl -z-0 pointer-events-none" />
                <img
                  src={shoe.image_url || shoe.image}
                  alt={shoe.title || shoe.name}
                  className="relative z-10 w-full h-auto max-h-[210px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.28)]"
                />
              </div>

              {/* Provenance Badge */}
              <div className="flex items-center gap-2 text-[9.5px] font-mono text-neutral-600 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>100% VERIFIED AUTHENTIC &bull; DEADSTOCK</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Details, Dynamic Gender Tag & Size Selector */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#f2f3ef]">
              <div>
                {/* Gender / Silhouette Category Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600/10 text-red-700 border border-red-600/20 font-mono text-[9px] font-bold tracking-widest uppercase">
                    {genderLabel}
                  </span>
                  <span className="text-[9.5px] font-mono tracking-wider text-neutral-500 uppercase">
                    {shoe.categoryName || "ARCHIVE DROP"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-impact text-xl sm:text-2xl uppercase tracking-tight text-[#141414] leading-tight line-clamp-2">
                  {shoe.title || shoe.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-mono text-lg sm:text-xl font-bold text-[#141414]">
                    {shoe.price}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    INCL. ALL TAXES
                  </span>
                </div>

                {/* Size Selection Grid */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2 text-[10.5px] font-mono uppercase tracking-wider">
                    <span className="font-bold text-neutral-700">SELECT SIZE ({genderLabel.split(" ")[0]}):</span>
                    <span className="text-red-600 font-semibold">{selectedSize}</span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5">
                    {sizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`py-1.5 px-1 rounded-lg font-mono text-[10px] font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center border ${
                            isSelected
                              ? "bg-[#141414] text-white border-[#141414] shadow-sm font-bold scale-[1.03]"
                              : "bg-white/80 hover:bg-white text-neutral-700 border-black/10 hover:border-black/30"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button: Add to Bag with Chosen Size */}
              <div className="mt-6 pt-4 border-t border-black/10">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3.5 px-6 rounded-full bg-[#141414] hover:bg-neutral-900 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-red-400" />
                  <span>ADD TO BAG &bull; {selectedSize} &bull; {shoe.price}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

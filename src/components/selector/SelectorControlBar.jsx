import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { CONFIG } from "./gridConfig";

const islandTransition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  mass: 0.9,
};

export function SelectorControlBar({
  activeFilter,
  onFilterChange,
  setZoomTrigger,
  isShoesPageMode,
  selectedShoe,
  onBuyNow,
}) {
  const filterTabs = [
    { id: "all", label: "All", mobileLabel: "All" },
    { id: "jordan", label: "Air Jordans", mobileLabel: "Jordans" },
    { id: "dunk", label: "Dunks", mobileLabel: "Dunks" },
    { id: "budget", label: "Under ₹15,000", mobileLabel: "< ₹15K" },
  ];

  return (
    <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 flex flex-col items-center justify-end z-40 pointer-events-none px-2 sm:px-4">
      <motion.div
        className="control-bar-island max-w-[96vw] sm:max-w-none"
        layout
        transition={islandTransition}
        style={{
          background: "rgba(255, 255, 255, 0.76)",
          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          borderRadius: "9999px",
          border: "1px solid rgba(20, 20, 20, 0.12)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          pointerEvents: "auto",
          height: "46px",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {selectedShoe ? (
            /* STATE 1: ACTIVE SELECTION / BUY NOW (IMAGE 1) */
            <motion.div
              key="buy-now-mode"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              className="flex items-center gap-1.5 sm:gap-3 px-1"
            >
              {/* Minus / Return to Shoes Grid Overview */}
              <button
                onClick={() => setZoomTrigger("OUT_TO_PAGE")}
                aria-label="Back to Shoes Grid"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#141414] hover:bg-black/5 transition-all cursor-pointer flex-shrink-0"
                title="Back to Shoes Grid"
              >
                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Hairline Divider */}
              <div className="w-[1px] h-4 sm:h-5 bg-black/10 mx-0.5" />

              <div className="hidden sm:flex flex-col text-left pl-1">
                <span className="text-[11px] font-bold text-[#141414] max-w-[180px] truncate leading-tight">
                  {selectedShoe.title}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 font-semibold leading-tight">
                  {selectedShoe.price}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onBuyNow && onBuyNow(selectedShoe)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#141414] text-white rounded-full font-mono text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase font-bold hover:bg-neutral-900 transition-all cursor-pointer shadow-lg whitespace-nowrap"
              >
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                <span>BUY NOW &bull; {selectedShoe.price}</span>
                <ArrowRight className="w-3 h-3 ml-0.5 sm:ml-1" />
              </motion.button>
            </motion.div>
          ) : isShoesPageMode ? (
            /* STATE 2: SHOES PAGE OVERVIEW (IMAGE 2 - SINGLE MINUS PILL) */
            <motion.div
              key="compact-mode"
              initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              className="flex items-center px-1"
            >
              <button
                onClick={() => setZoomTrigger("EXIT_ALL")}
                aria-label="Back to Home Screen"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#141414] hover:bg-black/5 transition-all cursor-pointer"
                title="Back to Home Screen"
              >
                <Minus className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            /* STATE 3: FULL SELECTOR FILTER TABS (MAIN HOME SCREEN) */
            <motion.div
              key="expanded-mode"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              className="flex items-center gap-1 sm:gap-2 px-0.5 sm:px-1"
            >
              {/* Zoom In Trigger */}
              <button
                onClick={() => setZoomTrigger("ENTER_PAGE")}
                aria-label="Open Shoes Archive"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#141414] hover:bg-black/5 transition-all cursor-pointer flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Hairline Divider */}
              <div className="w-[1px] h-4 sm:h-5 bg-black/10 mx-0.5" />

              {/* Filter Tabs */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {filterTabs.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onFilterChange(tab.id)}
                      className={`relative px-2.5 sm:px-4 py-1.5 rounded-full font-mono text-[9.5px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.14em] uppercase font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isActive ? "text-white font-bold" : "text-neutral-700 hover:text-black hover:bg-black/5"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeFilterPill"
                          transition={islandTransition}
                          className="absolute inset-0 bg-[#141414] rounded-full -z-10 shadow-sm"
                        />
                      )}
                      <span className="sm:hidden">{tab.mobileLabel}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Guide text line below the control pill */}
      {!selectedShoe && (
        <p className="text-[8.5px] sm:text-[9.5px] font-mono tracking-[0.24em] text-neutral-500 uppercase font-semibold mt-2 select-none pointer-events-none">
          CLICK ANY SILHOUETTE TO VIEW 3D ARCHIVE DETAILS
        </p>
      )}
    </div>
  );
}
export default SelectorControlBar;

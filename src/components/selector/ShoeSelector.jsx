import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { DEFAULT_CONFIG, CONFIG, applyResponsiveConfig } from "./gridConfig";
import { rigState, calculateGridDimensions, matchesFilter } from "./gridState";
import { Rig } from "./Rig";
import { GridCanvas } from "./GridCanvas";
import { SelectorControlBar } from "./SelectorControlBar";
import TopographyBackground from "../TopographyBackground";
import nikeShoesData from "../../data/nikeShoes.json";
import "./HoloCardMaterial";


export default function ShoeSelector({ onFocusChange, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [zoomTarget, setZoomTarget] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(rigState.zoom);
  const [activeShoe, setActiveShoe] = useState(null);
  const [isShoesPageMode, setIsShoesPageMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Helper to get items matching a filter
  const getItemsForFilter = (filterKey) => {
    const matched = nikeShoesData.filter((shoe) => matchesFilter(shoe, filterKey));
    if (filterKey === "budget") {
      return matched.slice(0, 12);
    }
    return matched;
  };

  // Stack of Grid Layers for smooth 3D staggered fly-in / fly-out transitions
  const [gridLayers, setGridLayers] = useState(() => [
    {
      id: "init",
      items: nikeShoesData,
      mode: "enter",
      startTime: 0,
    },
  ]);

  const activeLayer = gridLayers[gridLayers.length - 1] || gridLayers[0];
  const activeDims = useMemo(() => {
    return calculateGridDimensions(
      activeLayer.items.length,
      CONFIG.gridCols,
      CONFIG.itemSize,
      CONFIG.gap
    );
  }, [activeLayer.items.length]);

  // Poll rig zoom and active selection state for UI
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentZoom(rigState.zoom);
      const isFocused = rigState.activeId !== null;
      if (isFocused) {
        const found = nikeShoesData.find((s) => s.id === rigState.activeId);
        if (found) {
          setActiveShoe(found);
          setIsShoesPageMode(true);
        }
      } else {
        setActiveShoe(null);
      }
      if (onFocusChange) {
        onFocusChange(isShoesPageMode || isFocused);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onFocusChange, isShoesPageMode]);

  // Responsive zoom and grid columns configuration
  useEffect(() => {
    const updateResponsive = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenWidth(width);
      applyResponsiveConfig(width, height);
      if (rigState.activeId === null && rigState.zoom > CONFIG.zoomIn + 2) {
        rigState.zoom = CONFIG.zoomOut;
        setCurrentZoom(CONFIG.zoomOut);
      }
    };
    updateResponsive();
    window.addEventListener("resize", updateResponsive);
    return () => window.removeEventListener("resize", updateResponsive);
  }, []);

  // Handle category / brand switch with 3D flying stagger transition
  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    const now = Date.now();
    const newItems = getItemsForFilter(filter);

    setGridLayers((prev) => {
      // 1. Mark existing 'enter' layer as 'exit'
      const exitingLayers = prev.map((layer) =>
        layer.mode === "enter"
          ? { ...layer, mode: "exit", startTime: now }
          : layer
      );
      // 2. Add new entering layer
      const newLayer = {
        id: `grid-${filter}-${now}`,
        items: newItems,
        mode: "enter",
        startTime: now,
      };
      return [...exitingLayers, newLayer];
    });

    rigState.target.set(0, CONFIG.defaultTargetY ?? 0.4, 0);
    rigState.activeId = null;
    setActiveShoe(null);

    // 3. Clean up exiting layers after transition
    setTimeout(() => {
      setGridLayers((prev) => prev.filter((layer) => layer.mode === "enter"));
    }, CONFIG.cleanupTimeout);
  };

  // Zoom triggers from control bar
  useEffect(() => {
    if (zoomTarget === "OUT_TO_PAGE" || zoomTarget === "OUT") {
      // Return from Level 3 (Detailed shoe) to Level 2 (Enlarged row view for that specific row)
      const targetZoom = CONFIG.zoomGrid || 12.2;
      rigState.zoom = targetZoom;
      setCurrentZoom(targetZoom);
      const activeHeight = activeDims.height || 17.7;
      const yLimit = Math.max(0, (activeHeight - 9.5) / 2);
      const targetY = Math.max(-yLimit, Math.min(yLimit, rigState.target.y));
      rigState.target.set(0, targetY, 0);
      rigState.activeId = null;
      setActiveShoe(null);
      setIsShoesPageMode(true);
      if (onFocusChange) onFocusChange(true);
    } else if (zoomTarget === "EXIT_ALL") {
      // Return from Level 2 to Level 1 (Main Home Screen)
      rigState.zoom = CONFIG.zoomOut;
      setCurrentZoom(CONFIG.zoomOut);
      rigState.target.set(0, CONFIG.defaultTargetY ?? 0.4, 0);
      rigState.activeId = null;
      setActiveShoe(null);
      setIsShoesPageMode(false);
      if (onFocusChange) onFocusChange(false);
    } else if (zoomTarget === "ENTER_PAGE") {
      // Enter Level 2 (Enlarged row view) from Level 1
      const selectorElem = document.getElementById("selector");
      if (selectorElem) {
        if (window.__lenis) window.__lenis.scrollTo(selectorElem, { duration: 1.0 });
        else selectorElem.scrollIntoView({ behavior: "instant", block: "start" });
      }
      const targetZoom = CONFIG.zoomGrid || 12.2;
      rigState.zoom = targetZoom;
      setCurrentZoom(targetZoom);
      rigState.target.set(0, CONFIG.defaultTargetY ?? 0.4, 0);
      setIsShoesPageMode(true);
      if (onFocusChange) onFocusChange(true);
    } else if (typeof zoomTarget === "number") {
      rigState.zoom = zoomTarget;
      setCurrentZoom(zoomTarget);
    }
    setZoomTarget(null);
  }, [zoomTarget, onFocusChange, activeDims.height]);

  return (
    <section
      id="selector"
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#e0e2db] text-[#141414] select-none"
    >
      {/* Background Topography WebGL Shader */}
      <TopographyBackground
        speed={0.02}
        scale={2.4}
        lineThickness={0.03}
        lineOpacity={0.22}
      />

      {/* Top Header Bar for Shoe Selector */}
      <div
        className={`absolute top-8 sm:top-10 left-6 sm:left-10 md:left-14 right-6 sm:right-10 md:right-14 z-30 flex items-center justify-between pointer-events-none transition-all duration-500 ${
          activeShoe ? "opacity-0 -translate-y-6" : "opacity-100 translate-y-0"
        }`}
      >
        <div>
          <h2 className="font-impact uppercase font-bold text-lg sm:text-xl tracking-tight text-[#141414] leading-none">
            PERFECT PAIR
          </h2>
          <p className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.24em] uppercase text-neutral-600 font-semibold mt-1">
            ARCHIVE SELECTOR &bull; EST. 2026
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full border border-black/10 backdrop-blur-sm text-neutral-700 font-mono text-[10px] tracking-widest uppercase font-semibold">
          <span>02 SELECTOR</span>
          <span className="text-neutral-400">&bull;</span>
          <span>{activeLayer.items.length} PIECES</span>
        </div>
      </div>

      {/* 3D R3F Canvas */}
      <Canvas
        camera={{ position: [0, 0, DEFAULT_CONFIG.zoomOut], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.NoToneMapping,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Rig gridW={activeDims.width} gridH={activeDims.height} />

        <fog attach="fog" args={["#e0e2db", CONFIG.fogNear, CONFIG.fogFar]} />

        <Suspense fallback={null}>
          {gridLayers.map((layer) => (
            <GridCanvas
              key={layer.id}
              items={layer.items}
              gridVisible={layer.mode === "enter"}
              transitionStartTime={layer.startTime}
              interactive={layer.mode === "enter"}
              filter="all"
              screenWidth={screenWidth}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Floating Island Control Pill in Bottom-Center */}
      <SelectorControlBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        setZoomTrigger={setZoomTarget}
        isShoesPageMode={isShoesPageMode}
        selectedShoe={activeShoe}
        onBuyNow={(shoe) => {
          if (onAddToCart) {
            onAddToCart(shoe);
          } else if (shoe.product_url) {
            window.open(shoe.product_url, "_blank");
          }
        }}
      />
    </section>
  );
}

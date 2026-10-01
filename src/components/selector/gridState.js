import * as THREE from "three";
import { CONFIG } from "./gridConfig";

// Global rig animation & interaction state
export const rigState = {
  target: new THREE.Vector3(0, CONFIG.defaultTargetY ?? 0.4, 0),
  current: new THREE.Vector3(0, CONFIG.defaultTargetY ?? 0.4, 0),
  velocity: new THREE.Vector3(0, 0, 0),
  zoom: CONFIG.zoomOut,
  isDragging: false,
  activeId: null,
};

// Calculate Dimensions of the Grid
export const calculateGridDimensions = (
  count,
  cols = CONFIG.gridCols,
  itemSize = CONFIG.itemSize,
  gap = CONFIG.gap
) => {
  const rows = Math.ceil(count / cols);
  const spacing = itemSize + gap;
  return {
    width: cols * spacing,
    height: Math.max(rows * spacing, 1),
  };
};

export const EMPTY_COLORS = [];

// Helper to check if item matches selected category
export const matchesFilter = (item, filter) => {
  if (filter === "all") return true;
  if (filter === "jordan") {
    return item.category === "jordan" || item.title.toLowerCase().includes("jordan");
  }
  if (filter === "dunk") {
    return item.category === "dunk" || item.title.toLowerCase().includes("dunk");
  }
  if (filter === "budget") {
    // Under ₹15,000 filter
    return (item.priceRaw || 0) < 15000;
  }
  return true;
};

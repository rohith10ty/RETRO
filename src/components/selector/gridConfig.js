// Grid Configuration for 3D Shoe Selector
export const DEFAULT_CONFIG = {
  gridCols: 6,
  itemSize: 2.5,
  gap: 0.4,

  // Physics
  dragSpeed: 2.2,
  dampFactor: 0.2,
  tiltFactor: 0.08,
  clickThreshold: 5,
  dragResistance: 0.25,

  // Camera / Zoom
  zoomIn: 12,
  zoomGrid: 12.2, // Large, screen-filling row view
  zoomOut: 24,
  defaultTargetY: 0.4,
  zoomDamp: 0.25,

  // Visuals
  focusScale: 1.85,
  dimScale: 0.5,
  dimOpacity: 0.15,

  // 3D Curvature Effect
  curvatureStrength: 0.065, // spherical curving back
  rotationStrength: 0,

  // Culling
  cullDistance: 35,

  // Minimap
  mapWidth: 120,
  mapDotSize: 2,

  // Fog
  fogNear: 25,
  fogFar: 130,

  // Animation
  enterStartOpacity: 0.0,
  enterStartZ: -50,
  exitEndZ: 20,
  transitionZDamp: 0.25,
  enterOpacityDamp: 0.85,
  exitOpacityDamp: 0.15,
  enterStaggerDelay: 400,
  exitStaggerDelay: 300,
  cleanupTimeout: 700,
  exitSpreadY: 0.5,
  enterSpreadY: 1,
  transitionYDamp: 0.08,
  filterOpacityDamp: 0.06,
  filterScaleTarget: 0.5,

  // Background
  bgColor: "#e0e2db",
  bgOpacity: 0.24,
  bgSpeed: 0.02,
  bgScale: 2.4,
  bgLineThickness: 0.03,
};

export const getResponsiveConfig = (
  width = typeof window !== "undefined" ? window.innerWidth : 1200,
  height = typeof window !== "undefined" ? window.innerHeight : 800
) => {
  const aspect = width / Math.max(1, height);
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  if (isMobile) {
    // Exact framing for portrait mobile so the circular sphere is completely visible and round
    const mobileZoomOut = Math.max(40, Math.min(52, 18 / (0.8284 * aspect)));
    const mobileZoomGrid = Math.max(28, Math.min(38, 14 / (0.8284 * aspect)));

    return {
      ...DEFAULT_CONFIG,
      gridCols: 6,
      itemSize: 2.5,
      gap: 0.4,
      zoomIn: 12,
      zoomGrid: mobileZoomGrid,
      zoomOut: mobileZoomOut,
      defaultTargetY: 0.4,
      focusScale: 1.55,
      curvatureStrength: 0.06,
      cullDistance: 45,
      fogNear: 35,
      fogFar: 180,
      dragSpeed: 2.4,
    };
  } else if (isTablet) {
    const tabletZoomOut = Math.max(26, Math.min(36, 18 / (0.8284 * aspect)));
    const tabletZoomGrid = Math.max(16, Math.min(24, 14 / (0.8284 * aspect)));

    return {
      ...DEFAULT_CONFIG,
      gridCols: 6,
      itemSize: 2.5,
      gap: 0.4,
      zoomIn: 12,
      zoomGrid: tabletZoomGrid,
      zoomOut: tabletZoomOut,
      defaultTargetY: 0.4,
      focusScale: 1.7,
      curvatureStrength: 0.065,
      cullDistance: 35,
      fogNear: 28,
      fogFar: 140,
    };
  } else {
    // Desktop / Laptop -> exact 6x6 centered circular sphere
    return {
      ...DEFAULT_CONFIG,
      gridCols: 6,
      itemSize: 2.5,
      gap: 0.4,
      zoomGrid: 12.2,
      zoomIn: 12,
      zoomOut: 24,
      defaultTargetY: 0.4,
      curvatureStrength: 0.065,
      cullDistance: 35,
      fogNear: 25,
      fogFar: 130,
    };
  }
};

export let CONFIG = { ...DEFAULT_CONFIG };

export const applyResponsiveConfig = (width, height) => {
  const responsive = getResponsiveConfig(width, height);
  Object.assign(CONFIG, responsive);
  return CONFIG;
};

// Initialize with current window dimensions
if (typeof window !== "undefined") {
  applyResponsiveConfig(window.innerWidth, window.innerHeight);
}



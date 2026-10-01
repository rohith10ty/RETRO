import React, { useRef, useEffect, useState } from "react";

export function MiniMap({ gridDims, rigState, config, totalItems, isZoomedIn }) {
  const containerRef = useRef();
  const canvasRef = useRef();
  const zoomRef = useRef(1);
  const centerRef = useRef({ x: 0.5, y: 0.5 });
  const opacityRef = useRef(0);

  const [mapWidthPercent, setMapWidthPercent] = useState(8);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const aspectRatio = gridDims.width / gridDims.height;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    const updateDimensions = () => {
      let widthPercent = 8;
      if (window.innerWidth < 480) {
        widthPercent = 20;
      } else if (window.innerWidth < 768) {
        widthPercent = 14;
      }
      setMapWidthPercent(widthPercent);

      const width = (window.innerWidth * widthPercent) / 100;
      const height = width / aspectRatio;
      setDimensions({ width, height });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [aspectRatio]);

  const cols = config.gridCols;
  const rows = Math.ceil(totalItems / cols);

  useEffect(() => {
    let rafId;

    const draw = () => {
      if (!containerRef.current || !canvasRef.current) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const isMobile = window.innerWidth < 768;
      const isActive = rigState.isDragging || rigState.activeId !== null;
      const shouldShow = isMobile ? isActive && isZoomedIn : isActive;
      const targetOp = shouldShow ? 1 : 0;
      opacityRef.current += (targetOp - opacityRef.current) * 0.1;
      containerRef.current.style.opacity = opacityRef.current;

      if (opacityRef.current < 0.02) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const isFocused = rigState.activeId !== null;
      const targetZoom = isFocused ? 2.5 : 1;

      let targetCenterX = 0.5;
      let targetCenterY = 0.5;

      if (isFocused) {
        const col = rigState.activeId % cols;
        const row = Math.floor(rigState.activeId / cols);
        targetCenterX = (col + 0.5) / cols;
        targetCenterY = (row + 0.5) / rows;
      }

      zoomRef.current += (targetZoom - zoomRef.current) * 0.08;
      centerRef.current.x += (targetCenterX - centerRef.current.x) * 0.08;
      centerRef.current.y += (targetCenterY - centerRef.current.y) * 0.08;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      const zoom = zoomRef.current;
      const cx = centerRef.current.x * w;
      const cy = centerRef.current.y * h;

      ctx.translate(w / 2, h / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);

      const baseDotSize = Math.max(w, h) * 0.016;
      for (let i = 0; i < totalItems; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const nX = (c + 0.5) / cols;
        const nY = (r + 0.5) / rows;

        const isSelected = rigState.activeId === i;
        const dotSize = isSelected ? baseDotSize * 2.2 : baseDotSize;

        ctx.beginPath();
        ctx.arc(nX * w, nY * h, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#ef4444" : "rgba(20, 20, 20, 0.35)";
        ctx.fill();
      }

      if (!isFocused) {
        const offPctX = -rigState.current.x / gridDims.width;
        const offPctY = rigState.current.y / gridDims.height;

        const vFov = (45 * Math.PI) / 180;
        const viewHeight = 2 * Math.tan(vFov / 2) * 10;
        const viewWidth = viewHeight * (window.innerWidth / window.innerHeight);

        const rectW = Math.min(viewWidth / gridDims.width, 1) * w;
        const rectH = Math.min(viewHeight / gridDims.height, 1) * h;
        const rectX = (0.5 + offPctX) * w - rectW / 2;
        const rectY = (0.5 + offPctY) * h - rectH / 2;

        ctx.strokeStyle = "rgba(20, 20, 20, 0.75)";
        ctx.lineWidth = 1.5 / zoom;
        ctx.strokeRect(rectX, rectY, rectW, rectH);
      }

      ctx.restore();
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [gridDims, cols, rows, rigState, config, totalItems, isZoomedIn]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-6 right-6 z-40 bg-black/10 backdrop-blur-md border border-black/15 shadow-xl rounded-xl overflow-hidden pointer-events-none transition-opacity duration-300"
      style={{
        width: `${mapWidthPercent}vw`,
        minWidth: "75px",
        maxWidth: "140px",
        aspectRatio: aspectRatio || 1,
        opacity: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width * dpr || 120}
        height={dimensions.height * dpr || 80}
        className="w-full h-full"
      />
    </div>
  );
}
export default MiniMap;

import React, { useEffect, useState, useRef } from "react";
import { Html } from "@react-three/drei";

export function CloseButton({ isActive, position, onClose }) {
  const [shouldShow, setShouldShow] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!isActive) {
      timerRef.current = setTimeout(() => setShouldShow(false), 0);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
    timerRef.current = setTimeout(() => setShouldShow(true), 150);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive]);

  if (!isActive) return null;

  const [x, y, z] = position;

  return (
    <Html
      position={[x, y, z]}
      center
      style={{
        pointerEvents: "auto",
        transform: "translate(-50%, -150%)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onClose) onClose();
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onClose) onClose();
        }}
        className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black border border-black/20 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          opacity: shouldShow ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
        aria-label="Close detail view"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </Html>
  );
}
export default CloseButton;

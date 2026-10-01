import { useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CONFIG } from "./gridConfig";
import { matchesFilter, calculateGridDimensions } from "./gridState";
import { ShoeTile } from "./ShoeTile";

export function GridCanvas({
  items,
  gridVisible,
  transitionStartTime,
  interactive,
  filter = "all",
  screenWidth,
}) {
  const cols = CONFIG.gridCols;
  const itemSize = CONFIG.itemSize;
  const gap = CONFIG.gap;

  const { mappedItems, filteredGridDims } = useMemo(() => {
    const spacing = itemSize + gap;
    const filteredItems = items.filter((item) => matchesFilter(item, filter));
    const filteredCount = filteredItems.length;
    const filteredDims = calculateGridDimensions(filteredCount, cols, itemSize, gap);
    const maxDelay = gridVisible ? CONFIG.enterStaggerDelay : CONFIG.exitStaggerDelay;

    let filteredIdx = 0;
    const mapped = items.map((shoe, i) => {
      const matches = matchesFilter(shoe, filter);
      let targetPos;
      if (matches) {
        const col = filteredIdx % cols;
        const row = Math.floor(filteredIdx / cols);
        targetPos = {
          x: col * spacing - filteredDims.width / 2 + spacing / 2,
          y: -(row * spacing) + filteredDims.height / 2 - spacing / 2,
        };
        filteredIdx++;
      } else {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const originalDims = calculateGridDimensions(items.length, cols, itemSize, gap);
        targetPos = {
          x: col * spacing - originalDims.width / 2 + spacing / 2,
          y: -(row * spacing) + originalDims.height / 2 - spacing / 2,
        };
      }
      return {
        ...shoe,
        index: i,
        randomDelay: Math.random() * maxDelay,
        basePos: targetPos,
        matchesFilter: matches,
      };
    });
    return {
      mappedItems: mapped,
      filteredGridDims: filteredDims,
    };
  }, [items, filter, gridVisible, cols, itemSize, gap]);

  // Time-sliced mounting for smooth 60fps load
  const [mountedCount, setMountedCount] = useState(gridVisible ? 0 : items.length);
  useFrame(() => {
    if (mountedCount < mappedItems.length) {
      setMountedCount((prev) => Math.min(prev + 6, mappedItems.length));
    }
  });

  return (
    <>
      {mappedItems.map((item, i) => {
        if (i > mountedCount) return null;
        return (
          <ShoeTile
            key={item.id ?? item.product_url ?? item.index}
            data={item}
            index={item.index}
            basePos={item.basePos}
            gridVisible={gridVisible}
            transitionStartTime={transitionStartTime}
            interactive={interactive && item.matchesFilter}
            matchesFilter={item.matchesFilter}
            gridHeight={filteredGridDims.height}
          />
        );
      })}
    </>
  );
}
export default GridCanvas;


import React from "react";
import { type DotMatrix, type GridConfig } from "../types";
import { FlipDot } from "./flip-dot";
import { MatrixUtils } from "../utils/matrix-operations";

export interface FlipDotGridProps extends GridConfig {
  matrix: DotMatrix;
}

export const FlipDotGrid: React.FC<FlipDotGridProps> = ({
  matrix,
  padding,
  gap = 1,
  size = 4,
  activeColor,
  inactiveColor,
  animationDuration,
  className = "",
  secondIndicator = false,
}) => {
  // Apply padding if specified
  const paddedMatrix = padding
    ? MatrixUtils.addPadding(matrix, padding, secondIndicator)
    : matrix;

  if (paddedMatrix.length === 0) return null;

  const cols = paddedMatrix[0]?.length ?? 0;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${size}px)`,
    gap: `${gap}px`,
    width: "fit-content",
  };

  return (
    <div style={gridStyle} className={className}>
      {paddedMatrix.map((row, rowIndex) =>
        row.map((isActive, colIndex) => (
          <FlipDot
            key={`${rowIndex}-${colIndex}`}
            isActive={isActive === 1}
            size={size}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            animationDuration={animationDuration}
            secondIndicator={secondIndicator}
          />
        ))
      )}
    </div>
  );
};

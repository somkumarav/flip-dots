import React, { useMemo } from "react";
import { type DotMatrix, type FontSet, type GridConfig } from "../types";
import { FlipDot } from "./flip-dot";
import { MatrixUtils } from "../utils/matrix-operations";
import { TextRenderer } from "../utils/text-renderer";
import { FONT_5x7 } from "../fonts/terminal-5x7";

export type FlipDotGridProps = GridConfig &
  (
    | {
        matrix: DotMatrix;
        text?: never;
        font?: never;
        letterSpacing?: never;
        wordSpacing?: never;
      }
    | {
        text: string;
        matrix?: never;
        font?: FontSet;
        letterSpacing?: number;
        wordSpacing?: number;
      }
  );

export const FlipDotGrid: React.FC<FlipDotGridProps> = ({
  text,
  font = FONT_5x7,
  letterSpacing,
  wordSpacing,
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
  const displayMatrix = useMemo(() => {
    if (text !== undefined) {
      const renderer = new TextRenderer({
        font,
        letterSpacing,
        wordSpacing,
      });

      if (padding) {
        return renderer.renderWithPadding(text, padding, secondIndicator);
      }
      return renderer.render(text);
    }

    if (matrix) {
      return padding
        ? MatrixUtils.addPadding(matrix, padding, secondIndicator)
        : matrix;
    }

    return [];
  }, [text, matrix, font, letterSpacing, wordSpacing, padding]);

  if (displayMatrix.length === 0) {
    console.warn("FlipDotGrid: No matrix or text provided");
    return null;
  }

  const cols = displayMatrix[0]?.length ?? 0;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${size}px)`,
    gap: `${gap}px`,
    width: "fit-content",
  };

  return (
    <div style={gridStyle} className={className}>
      {displayMatrix.map((row, rowIndex) =>
        row.map((isActive, colIndex) => (
          <FlipDot
            key={`${rowIndex}-${colIndex}`}
            isActive={isActive === 1}
            size={size}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            animationDuration={animationDuration}
          />
        ))
      )}
    </div>
  );
};

import React from "react";
import { type DotConfig } from "../types";

export interface FlipDotProps extends DotConfig {
  isActive: boolean;
}

export const FlipDot: React.FC<FlipDotProps> = ({
  isActive,
  size = 4,
  activeColor = "#e9e0d2",
  inactiveColor = "#173f35",
  animationDuration = 200,
  className = "",
}) => {
  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: isActive ? activeColor : inactiveColor,
    transition: `all ${animationDuration}ms ease-in-out`,
    transform: isActive ? "rotateY(0deg)" : "rotateY(180deg)",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    borderRadius: "50%",
  };

  return <div style={style} className={className} />;
};

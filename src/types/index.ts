export type DotMatrix = number[][];

export interface DotConfig {
  size?: number;
  gap?: number;
  activeColor?: string;
  inactiveColor?: string;
  animationDuration?: number;
  className?: string;
  secondIndicator?: boolean;
}

export interface GridConfig extends DotConfig {
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export interface FontGlyph {
  width: number;
  height: number;
  data: number[][];
}

export type FontSet = Record<string, FontGlyph>;

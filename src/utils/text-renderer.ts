import { type DotMatrix, type FontSet } from "../types";
import { MatrixUtils } from "./matrix-operations";

export interface TextRenderOptions {
  font: FontSet;
  letterSpacing?: number;
  wordSpacing?: number;
}

export class TextRenderer {
  private font: FontSet;
  private letterSpacing: number;
  private wordSpacing: number;

  constructor(options: TextRenderOptions) {
    this.font = options.font;
    this.letterSpacing = options.letterSpacing ?? 1;
    this.wordSpacing = options.wordSpacing ?? 3;
  }

  /**
   * Converts text to a dot matrix
   */
  render(text: string): DotMatrix {
    const chars = text.toUpperCase().split("");
    if (chars.length === 0) return [];

    let result: DotMatrix = [];

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (!char) continue;
      const glyph = this.font[char] ?? this.font[" "];

      if (!glyph) {
        console.warn(`Character "${char}" not found in font, skipping`);
        continue;
      }

      // const spacing = char === " " ? this.wordSpacing : this.letterSpacing;
      // const actualSpacing = i === chars.length - 1 ? 0 : spacing;

      if (result.length === 0) {
        result = glyph.data;
      } else {
        result = MatrixUtils.joinHorizontal(
          result,
          glyph.data,
          this.letterSpacing
        );
      }
    }

    return result;
  }

  /**
   * Renders text with automatic padding
   */
  renderWithPadding(
    text: string,
    padding: { top?: number; right?: number; bottom?: number; left?: number },
    secondIndicator: boolean
  ): DotMatrix {
    const matrix = this.render(text);
    return MatrixUtils.addPadding(matrix, padding, secondIndicator);
  }
}

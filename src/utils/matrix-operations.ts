import { type DotMatrix } from "../types";

export class MatrixUtils {
  /**
   * Creates a matrix filled with zeros
   */
  static createEmpty(rows: number, cols: number): DotMatrix {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  /**
   * Validates that a matrix is rectangular (all rows same length)
   */
  static isRectangular(matrix: DotMatrix): boolean {
    if (matrix.length === 0) return true;
    const width = matrix[0]?.length;
    return matrix.every((row) => row.length === width);
  }

  /**
   * Gets matrix dimensions
   */
  static getDimensions(matrix: DotMatrix): { rows: number; cols: number } {
    return {
      rows: matrix.length,
      cols: matrix[0]?.length ?? 0,
    };
  }

  /**
   * Joins two matrices horizontally
   */
  static joinHorizontal(
    left: DotMatrix,
    right: DotMatrix,
    spacing = 0
  ): DotMatrix {
    if (left.length === 0) return right;
    if (right.length === 0) return left;

    if (left.length !== right.length) {
      throw new Error(
        `Cannot join horizontally: left has ${left.length} rows, right has ${right.length} rows`
      );
    }

    const spacer = spacing > 0 ? Array(spacing).fill(0) : [];
    return left.map((row, idx) => [...row, ...spacer, ...(right[idx] ?? [])]);
  }

  /**
   * Joins two matrices vertically
   */
  static joinVertical(
    top: DotMatrix,
    bottom: DotMatrix,
    spacing = 0
  ): DotMatrix {
    if (top.length === 0) return bottom;
    if (bottom.length === 0) return top;

    const topWidth = top[0]?.length ?? 0;
    const bottomWidth = bottom[0]?.length ?? 0;

    if (topWidth !== bottomWidth) {
      throw new Error(
        `Cannot join vertically: top has ${topWidth} cols, bottom has ${bottomWidth} cols`
      );
    }

    const spacer =
      spacing > 0
        ? Array.from({ length: spacing }, () => Array(topWidth).fill(0))
        : [];

    return [...top, ...spacer, ...bottom];
  }

  /**
   * Adds padding around a matrix
   */
  static addPadding(
    matrix: DotMatrix,
    padding: { top?: number; right?: number; bottom?: number; left?: number },
    secondIndicator: boolean
  ): DotMatrix {
    if (matrix.length === 0) return matrix;

    const { top = 0, right = 0, bottom = 0, left = 0 } = padding;
    const firstRow = matrix[0];

    if (!firstRow) {
      throw new Error("Matrix has rows but first row is undefined");
    }
    const width = firstRow.length;

    // Add left and right padding to each row
    let result = matrix.map((row) => [
      ...Array(left).fill(0),
      ...row,
      ...Array(right).fill(0),
    ]);

    // Add top padding
    if (top > 0) {
      let topPadding;
      if (secondIndicator) {
        const now = new Date();
        topPadding = Array.from({ length: top }, () => [
          ...Array(width + left + right - 1).fill(0),
          now.getSeconds() % 2 == 0 ? 0 : 1,
        ]);
      } else {
        topPadding = Array.from({ length: top }, () => [
          ...Array(width + left + right).fill(0),
        ]);
      }
      result = [...topPadding, ...result];
    }

    // Add bottom padding
    if (bottom > 0) {
      const bottomPadding = Array.from({ length: bottom }, () =>
        Array(width + left + right).fill(0)
      );
      result = [...result, ...bottomPadding];
    }

    return result;
  }

  /**
   * Clones a matrix
   */
  static clone(matrix: DotMatrix): DotMatrix {
    return matrix.map((row) => [...row]);
  }
}

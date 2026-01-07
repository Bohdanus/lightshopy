import { exp1_1 } from './functions.ts';
import { applyFilter } from './applyFilter.ts';

export type ColorsToolType = { grayscale: number; sepia: number; saturation: number };

export const colors =
  (canvas: HTMLCanvasElement, source: ImageBitmap) =>
  ({ grayscale, sepia, saturation }: ColorsToolType) =>
    applyFilter(canvas, (ctx) => {
      ctx.filter = `grayscale(${grayscale}%) sepia(${sepia}%) saturate(${exp1_1(saturation, 2.1)})`;
      ctx.drawImage(source, 0, 0);
    });

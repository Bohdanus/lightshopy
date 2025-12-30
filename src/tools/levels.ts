import { exp1_1 } from './functions.ts';
import { applyFilter } from './applyFilter.ts';

export type LevelsToolType = { brightness: number; contrast: number };

export const levels =
  (canvas: HTMLCanvasElement, snapshot: ImageBitmap) =>
  ({ brightness, contrast }: LevelsToolType) =>
    applyFilter(canvas, snapshot, (ctx, source) => {
      ctx.filter = `brightness(${exp1_1(brightness, 1.9)}) contrast(${exp1_1(contrast, 2.2)})`;
      ctx.drawImage(source, 0, 0);
    });

import { exp1_1 } from './functions.ts';
import { applyFilter } from './applyFilter.ts';

export const levels =
  (image: HTMLImageElement | null) =>
  ({ brightness, contrast }: { brightness: number; contrast: number }) =>
    applyFilter(image, `brightness(${exp1_1(brightness, 1.9)}) contrast(${exp1_1(contrast, 2.2)})`);

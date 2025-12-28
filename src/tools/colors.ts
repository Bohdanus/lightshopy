import { exp1_1 } from './functions.ts';
import { applyFilter } from './applyFilter.ts';

export const colors =
  (image: HTMLImageElement | null) =>
  ({ grayscale, sepia, saturation }: { grayscale: number; sepia: number; saturation: number }) =>
    applyFilter(image, `grayscale(${grayscale}%) sepia(${sepia}%) saturate(${exp1_1(saturation, 2.1)})`);

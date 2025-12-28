import { applyFilter } from './applyFilter.ts';

export const blur =
  (image: HTMLImageElement | null) =>
  ({ radius }: { radius: number }) =>
    applyFilter(image, `blur(${radius}px)`);

import { applyFilter } from './applyFilter.ts';

export type BlurToolType = { radius: number };

export const blur =
  (canvas: HTMLCanvasElement, source: ImageBitmap) =>
  ({ radius }: BlurToolType) =>
    applyFilter(canvas, (ctx) => {
      ctx.filter = `blur(${radius}px)`;
      ctx.drawImage(source, 0, 0);
    });

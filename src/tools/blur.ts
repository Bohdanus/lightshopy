import { applyFilter } from './applyFilter.ts';

export type BlurToolType = { radius: number };

export const blur =
  (canvas: HTMLCanvasElement, snapshot: ImageBitmap) =>
  ({ radius }: BlurToolType) =>
    applyFilter(canvas, snapshot, (ctx, source) => {
      ctx.filter = `blur(${radius}px)`;
      ctx.drawImage(source, 0, 0);
    });

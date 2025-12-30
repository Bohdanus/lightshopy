import { applyFilter } from './applyFilter.ts';
import type { Point } from '../contexts/ImageContext.tsx';

export type DrawToolType = { color: string; size: number; points: Point[] };

export const draw =
  (canvas: HTMLCanvasElement, snapshot: ImageBitmap) =>
  ({ color, size, points }: DrawToolType) => {
    return applyFilter(canvas, snapshot, (ctx, source) => {
      ctx.drawImage(source, 0, 0);
      if (!points || points.length === 0) return;

      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    });
  };

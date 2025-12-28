import { applyFilter } from './applyFilter.ts';
import type { Point } from '../contexts/ImageContext.tsx';

export const draw =
  (image: HTMLImageElement | null) =>
  ({ color, size, points }: { color: string; size: number; points: Point[] }) => {
    return applyFilter(image, {
      draw: (ctx, img) => {
        ctx.drawImage(img, 0, 0);
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
      },
    });
  };

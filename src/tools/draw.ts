import { applyFilter } from './applyFilter.ts';
import type { Point } from '../contexts/ImageContext.tsx';

export type PenType = 'pen' | 'marker' | 'eraser' | 'highlighter' | 'vivid';

export type DrawToolType = { alpha: number; color: string; penType: PenType; size: number; points: Point[] };

export type DrawToolNoPoints = Omit<DrawToolType, 'points'>;

export const setDrawTool = (ctx: CanvasRenderingContext2D, args: DrawToolNoPoints) => {
  const { alpha, color, penType, size } = args;

  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.globalAlpha = alpha;

  if (penType === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
  } else if (penType === 'marker') {
    ctx.globalCompositeOperation = 'multiply';
  } else if (penType === 'highlighter') {
    ctx.globalCompositeOperation = 'lighter';
  } else if (penType === 'vivid') {
    ctx.globalCompositeOperation = 'overlay';
  } else {
    ctx.globalCompositeOperation = 'source-over';
  }
};

export const draw = (canvas: HTMLCanvasElement, source: ImageBitmap) => (args: DrawToolType) => {
  return applyFilter(canvas, (ctx) => {
    ctx.drawImage(source, 0, 0);

    const { points } = args;
    if (!points || points.length === 0) return;

    setDrawTool(ctx, args);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  });
};

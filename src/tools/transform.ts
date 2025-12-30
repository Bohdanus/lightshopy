import { applyFilter } from './applyFilter.ts';

export type TransformToolType = { rotate: number; mirrorH: boolean; mirrorV: boolean };

export const transform =
  (canvas: HTMLCanvasElement, snapshot: ImageBitmap) =>
  ({ rotate = 0, mirrorH = false, mirrorV = false }: TransformToolType) => {
    return applyFilter(canvas, snapshot, (ctx: CanvasRenderingContext2D, source: ImageBitmap) => {
      const angle = (rotate * Math.PI) / 180;
      const absCos = Math.abs(Math.cos(angle));
      const absSin = Math.abs(Math.sin(angle));

      const width = Math.round(snapshot.width * absCos + snapshot.height * absSin);
      const height = Math.round(snapshot.width * absSin + snapshot.height * absCos);

      canvas.width = width;
      canvas.height = height;

      ctx.translate(width / 2, height / 2);
      ctx.rotate(angle);
      ctx.scale(mirrorH ? -1 : 1, mirrorV ? -1 : 1);
      ctx.drawImage(source, -snapshot.width / 2, -snapshot.height / 2);
    });
  };

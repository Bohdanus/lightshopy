import { applyFilter } from './applyFilter.ts';

export const transform =
  (image: HTMLImageElement | null) =>
  ({
    rotate = 0,
    mirrorH = false,
    mirrorV = false,
  }: {
    rotate: number;
    mirrorH: boolean;
    mirrorV: boolean;
  }): [CanvasRenderingContext2D, Promise<HTMLImageElement>] | [null, null] => {
    if (!image) {
      return [null, null];
    }

    const angle = (rotate * Math.PI) / 180;
    const absCos = Math.abs(Math.cos(angle));
    const absSin = Math.abs(Math.sin(angle));

    const width = image.width * absCos + image.height * absSin;
    const height = image.width * absSin + image.height * absCos;

    return applyFilter(image, {
      width,
      height,
      draw: (ctx) => {
        ctx.translate(width / 2, height / 2);
        ctx.rotate(angle);
        ctx.scale(mirrorH ? -1 : 1, mirrorV ? -1 : 1);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
      },
    });
  };

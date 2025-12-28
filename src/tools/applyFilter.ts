export type DrawCallback = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => void;

export const applyFilter = (
  image: HTMLImageElement | null,
  options:
    | string
    | {
        filterString?: string;
        width?: number;
        height?: number;
        draw?: DrawCallback;
      }
): [CanvasRenderingContext2D, Promise<HTMLImageElement>] | [null, null] => {
  if (!image) {
    return [null, null];
  }

  const filterString = typeof options === 'string' ? options : options.filterString;
  const width = (typeof options !== 'string' && options.width) || image.width;
  const height = (typeof options !== 'string' && options.height) || image.height;
  const draw =
    (typeof options !== 'string' && options.draw) ||
    ((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => ctx.drawImage(img, 0, 0));

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return [null, null];
  }

  canvas.width = width;
  canvas.height = height;

  if (filterString) {
    ctx.filter = filterString;
  }

  draw(ctx, image);

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const newImg = new Image();
    newImg.onload = () => resolve(newImg);
    newImg.onerror = reject;
    newImg.src = canvas.toDataURL();
  });

  return [ctx, promise];
};

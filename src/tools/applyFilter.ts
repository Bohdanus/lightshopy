export const applyFilter = async (
  canvas: HTMLCanvasElement,
  bitmap: ImageBitmap,
  action: (ctx: CanvasRenderingContext2D, source: ImageBitmap) => void
): Promise<ImageBitmap> => {
  const ctx = canvas.getContext('2d');

  if (canvas.width !== bitmap.width || canvas.height !== bitmap.height) {
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
  }

  ctx!.reset();
  action(ctx!, bitmap);

  return await createImageBitmap(canvas);
};

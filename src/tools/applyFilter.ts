export const applyFilter = async (
  canvas: HTMLCanvasElement,
  action: (ctx: CanvasRenderingContext2D) => void
): Promise<ImageBitmap> => {
  const ctx = canvas.getContext('2d');

  ctx!.reset();
  action(ctx!);

  return await createImageBitmap(canvas);
};

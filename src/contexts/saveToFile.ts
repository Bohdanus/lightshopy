export const saveImage = (canvas: HTMLCanvasElement | null, filename: string, format: string = 'image/png') => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const link = document.createElement('a');
  link.download = `${filename}.${format.split('/')[1]}`;
  link.href = canvas.toDataURL(format);
  link.click();

  return true;
};

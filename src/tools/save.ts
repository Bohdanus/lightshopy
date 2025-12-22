
export const saveImage = (image: HTMLImageElement, filename: string, format: string = 'image/png') => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.drawImage(image, 0, 0);
  
  const link = document.createElement('a');
  link.download = `${filename}.${format.split('/')[1]}`;
  link.href = canvas.toDataURL(format);
  link.click();
};

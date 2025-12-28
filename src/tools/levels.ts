import { exp1_1 } from './functions.ts';

export const levels =
  (image: HTMLImageElement | null) =>
  ({ brightness = 100, contrast = 100 }: { brightness?: number; contrast?: number }): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      if (!image) {
        reject(new Error('No image'));
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;

      // Apply brightness and contrast filters
      ctx.filter = `brightness(${exp1_1(brightness, 1.9)}) contrast(${exp1_1(contrast, 2.2)})`;
      ctx.drawImage(image, 0, 0);

      const newImg = new Image();
      newImg.onload = () => resolve(newImg);
      newImg.onerror = reject;
      newImg.src = canvas.toDataURL();
    });
  };

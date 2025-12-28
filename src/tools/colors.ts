import { exp1_1 } from './functions.ts';

export const colors =
  (image: HTMLImageElement | null) =>
  ({
    grayscale = 100,
    sepia = 0,
    saturation = 100,
  }: {
    grayscale?: number;
    sepia?: number;
    saturation?: number;
  }): Promise<HTMLImageElement> => {
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

      // filter
      ctx.filter = `grayscale(${grayscale}%) sepia(${sepia}%) saturate(${exp1_1(saturation, 2.1)})`;
      ctx.drawImage(image, 0, 0);

      const newImg = new Image();
      newImg.onload = () => {
        resolve(newImg);
      };
      newImg.onerror = (err) => {
        reject(err);
      };
      newImg.src = canvas.toDataURL();
    });
  };

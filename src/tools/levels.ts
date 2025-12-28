import { exp1_1 } from './functions.ts';

export const levels =
  (image: HTMLImageElement | null) =>
  ({ brightness = 100, contrast = 100 }: { brightness?: number; contrast?: number }): HTMLImageElement | null => {
    if (!image) {
      return null;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }

    canvas.width = image.width;
    canvas.height = image.height;

    // Apply brightness and contrast filters
    ctx.filter = `brightness(${exp1_1(brightness, 1.9)}) contrast(${exp1_1(contrast, 2.2)})`;
    ctx.drawImage(image, 0, 0);

    const newImg = new Image();
    newImg.src = canvas.toDataURL();

    return newImg;
  };

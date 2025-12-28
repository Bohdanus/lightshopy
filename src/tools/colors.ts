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
  }): HTMLImageElement | null => {
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

    // filter
    ctx.filter = `grayscale(${grayscale}%) sepia(${sepia}%) saturate(${exp1_1(saturation, 2.1)})`;
    ctx.drawImage(image, 0, 0);

    const newImg = new Image();
    newImg.src = canvas.toDataURL();

    return newImg;
  };

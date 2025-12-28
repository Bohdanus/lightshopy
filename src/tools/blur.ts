export const blur =
  (image: HTMLImageElement | null) =>
  ({ radius = 5 }: { radius?: number }): HTMLImageElement | null => {
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
    ctx.filter = `blur(${radius}px)`;
    ctx.drawImage(image, 0, 0);

    const newImg = new Image();
    newImg.src = canvas.toDataURL();

    return newImg;
  };

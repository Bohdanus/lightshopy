export const applyGrayscale = (image: HTMLImageElement | null): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      alert('Failed to get canvas context');
      return;
    }

    canvas.width = image.width;
    canvas.height = image.height;

    // filter
    ctx.filter = 'grayscale(100%)';
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

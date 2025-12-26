export const grayscale =
  (image: HTMLImageElement | null) =>
  ({ percent = 100 }: { percent?: number }): Promise<HTMLImageElement> => {
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

      percent = Math.min(percent, 100);
      percent = Math.max(percent, 0);
      // filter
      ctx.filter = `grayscale(${percent}%)`;
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

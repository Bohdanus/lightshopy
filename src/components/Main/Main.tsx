import { useRef, useState, useEffect, useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext';

interface MainProps {
  onOpenClick: () => void;
}

const Main = ({ onOpenClick }: MainProps) => {
  const { currentImage, _setOriginalImage } = useContext(ImageContext);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];

    await _setOriginalImage(file);
  };

  useEffect(() => {
    if (currentImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = currentImage.width;
        canvas.height = currentImage.height;
        ctx.drawImage(currentImage, 0, 0);
      }
    }
  }, [currentImage]);

  return (
    <main
      className={`main-content p-3 d-flex align-items-center justify-content-center ${isDragging ? 'bg-light border border-primary' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ transition: 'background-color 0.2s, border 0.2s' }}
    >
      {currentImage ? (
        <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      ) : (
        <button className="btn btn-primary btn-lg" onClick={onOpenClick}>
          Open File
        </button>
      )}
    </main>
  );
};

export default Main;

import { useState, useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext';

interface MainProps {
  onOpenClick: () => void;
}

const Main = ({ onOpenClick }: MainProps) => {
  const { currentImage, originalImage, _setOriginalImage } = useContext(ImageContext);
  const [isDragging, setIsDragging] = useState(false);

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

  const renderContent = () => {
    if (!originalImage) {
      return (
        <button className="btn btn-primary btn-lg" onClick={onOpenClick}>
          Open File
        </button>
      );
    }

    if (!currentImage) {
      return <b>error processing image</b>;
    }

    return (
      <img
        src={currentImage.src}
        alt="current image"
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
      />
    );
  };

  return (
    <main
      className={`main-content p-3 d-flex align-items-center justify-content-center ${isDragging ? 'bg-light border border-primary' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ transition: 'background-color 0.2s, border 0.2s' }}
    >
      {renderContent()}
    </main>
  );
};

export default Main;

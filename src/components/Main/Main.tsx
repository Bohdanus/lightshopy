import { useState, useContext, useEffect, useRef } from 'react';
import { ImageContext, type Point } from '../../contexts/ImageContext';
import { throttle } from 'lodash-es';
import { THROTTLE_DRAW } from '../../constants';

interface MainProps {
  onOpenClick: () => void;
}

const Main = ({ onOpenClick }: MainProps) => {
  const { currentCtx, originalImage, _setOriginalImage, getCurrentTool, updateLastHistoryItem, startEmptyTool } =
    useContext(ImageContext);
  const [isDragging, setIsDragging] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentTool = getCurrentTool();
  const isDrawToolActive = currentTool?.tool === 'draw';

  useEffect(() => {
    if (currentCtx && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = currentCtx.canvas.width;
        canvas.height = currentCtx.canvas.height;
        ctx.drawImage(currentCtx.canvas, 0, 0);
      }
    }
  }, [currentCtx]);

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

  const getCanvasCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return null;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawToolActive) return;
    setIsDrawing(true);
    const coords = getCanvasCoordinates(event);
    if (coords && currentTool) {
      throttledUpdate.cancel(); // Cancel any pending throttled updates from previous stroke
      (currentTool.args.points as Point[]).push(coords);
      updateLastHistoryItem({
        ...currentTool.args,
      });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && isDrawToolActive) {
      throttledUpdate.flush();
      setIsDrawing(false);
      startEmptyTool('draw');
    }
  };

  const throttledUpdate = throttle((args) => {
    updateLastHistoryItem(args);
  }, THROTTLE_DRAW);

  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !isDrawToolActive || !currentTool) return;
    const coords = getCanvasCoordinates(event);
    if (coords) {
      (currentTool.args.points as Point[]).push(coords);
      throttledUpdate({
        ...currentTool.args,
      });
    }
  };

  const renderContent = () => {
    if (!originalImage) {
      return (
        <button className="btn btn-primary btn-lg" onClick={onOpenClick}>
          Open File
        </button>
      );
    }

    if (!currentCtx) {
      return <b>error processing image</b>;
    }

    return (
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
          cursor: isDrawToolActive ? 'crosshair' : 'default',
          touchAction: isDrawToolActive ? 'none' : 'auto',
        }}
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

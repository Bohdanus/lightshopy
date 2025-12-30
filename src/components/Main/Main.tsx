import { useState, useContext, useRef, useLayoutEffect } from 'react';
import { ImageContext, type Point } from '../../contexts/ImageContext';
import type { DrawToolType } from '../../tools/draw.ts';

const Main = () => {
  const {
    canvasRef,
    originalImage,
    _setOriginalImage,
    toolName,
    toolArgs,
    updateLastHistoryItem,
    openLoadImageDialog,
  } = useContext(ImageContext);
  const [isDragging, setIsDragging] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pendingPoints = useRef<Point[]>([]);
  const frameRequested = useRef(false);

  const isDrawToolActive = toolName === 'draw';

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    ctxRef.current = ctx;

    // Hi-DPI safe setup
    // const dpr = window.devicePixelRatio || 1;
    // const rect = canvas.getBoundingClientRect();
    //
    // // eslint-disable-next-line react-compiler/react-compiler
    // canvas.width = rect.width * dpr;
    // canvas.height = rect.height * dpr;
    // ctx.scale(dpr, dpr);

    if (toolName === 'draw') {
      const { size, color } = toolArgs as DrawToolType;
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
    }

    return () => {
      ctxRef.current = null;
    };
  }, [canvasRef, toolName, toolArgs]);

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
    if (coords && toolName) {
      const args = toolArgs as DrawToolType;
      const { color, size, points } = args;
      points.push(coords);

      const ctx = ctxRef.current!;
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && isDrawToolActive) {
      if (isDrawing) {
        updateLastHistoryItem(toolArgs!, true);
      }
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !isDrawToolActive || !toolName) return;
    const coords = getCanvasCoordinates(event);
    if (coords) {
      pendingPoints.current.push(coords);
      if (!frameRequested.current) {
        frameRequested.current = true;
        requestAnimationFrame(draw);
      }
    }
  };

  function draw() {
    const pp = pendingPoints.current;
    const l = pp.length;
    for (let i = 0; i < l; i++) {
      ctxRef.current!.lineTo(pp[i].x, pp[i].y);
    }
    ctxRef.current!.stroke();
    frameRequested.current = false;
    pendingPoints.current = [];

    (toolArgs!.points as Point[]).push(...pp);
  }

  const renderContent = () => {
    return (
      <>
        <canvas
          ref={canvasRef}
          onPointerDown={handleMouseDown}
          onPointerMove={handleMouseMove}
          onPointerUp={handleMouseUp}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            display: originalImage ? 'block' : 'none',
            cursor: isDrawToolActive ? 'crosshair' : 'default',
            touchAction: isDrawToolActive ? 'none' : 'auto',
          }}
        />
        {!originalImage && (
          <button className="btn btn-primary btn-lg" onClick={openLoadImageDialog}>
            Open File
          </button>
        )}
      </>
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

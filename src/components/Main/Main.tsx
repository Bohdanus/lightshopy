import { useRef, useState, useEffect } from 'react';
import { useImage } from '../../contexts/ImageContext';
import { loadImageFile } from '../../tools/imageLoader';

interface MainProps {
    onOpenClick: () => void;
}

const Main = ({ onOpenClick }: MainProps) => {
    const { image, setImage } = useImage();
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
        if (file) {
            try {
                const img = await loadImageFile(file);
                setImage(img);
            } catch (error) {
                console.error('Failed to load image:', error);
            }
        }
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            }
        }
    }, [image]);

    return (
        <main
            className={`main-content p-3 d-flex align-items-center justify-content-center ${isDragging ? 'bg-light border border-primary' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ transition: 'background-color 0.2s, border 0.2s' }}
        >
            {!image ? (
                <button className="btn btn-primary btn-lg" onClick={onOpenClick}>
                    Open File
                </button>
            ) : (
                <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            )}
        </main>
    );
}

export default Main;
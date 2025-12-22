import React, {createContext, useContext, useState, type ReactNode, useRef} from 'react';
import {loadImageFile} from "../tools/imageLoader.ts";

interface ImageContextType {
  image: HTMLImageElement | null;
  loadImageFromDisk: () => void;
  setImage: (image: HTMLImageElement | null) => void;
}

const ImageContext = createContext<ImageContextType>({
  image: null,
  loadImageFromDisk: () => { },
  setImage: () => { }
});

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const img = await loadImageFile(file);
        setImage(img);
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    }
    // Reset input so the same file can be selected again if needed
    if (event.target) {
      event.target.value = '';
    }
  };

  const loadImageFromDisk = () => {
    fileInputRef.current?.click();
  }

  return (
    <ImageContext.Provider value={{ image, loadImageFromDisk, setImage }}>
      {children}
      <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
      />    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  return context;
};

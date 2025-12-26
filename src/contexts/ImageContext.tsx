import { createContext } from 'react';

interface ImageContextType {
  fileName: string;
  setFileName: (name: string) => void;
  currentImage: HTMLImageElement | null;
  originalImage: HTMLImageElement | null;
  openLoadImageDialog: () => void;
  openSaveImageDialog: () => void;
  setCurrentImage: (image: HTMLImageElement | null) => void;
  _setOriginalImage: (image?: File) => Promise<void>; // use with caution now and refactor later
}

export const ImageContext = createContext<ImageContextType>({
  fileName: '',
  setFileName: () => {},
  currentImage: null,
  originalImage: null,
  openLoadImageDialog: () => {},
  openSaveImageDialog: () => {},
  setCurrentImage: () => {},
  _setOriginalImage: () => Promise.resolve(),
});

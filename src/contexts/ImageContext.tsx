import { createContext, type RefObject } from 'react';
import { toolsMap } from '../tools/toolsMap.ts';
import type { CropToolType } from '../tools/crop.ts';

export type Point = { x: number; y: number };

export type ToolName = keyof typeof toolsMap;
export type ToolArgs = Record<string, string | number | Point[]>;

export type HistoryItem = {
  saved: boolean;
  tool: ToolName;
  args: ToolArgs;
  bitmap?: ImageBitmap | null;
  imageBlob?: Blob | null;
};

interface ImageContextType {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  fileName: string;
  setFileName: (name: string) => void;
  originalImage: HTMLImageElement | null;
  openLoadImageDialog: () => void;
  openSaveImageDialog: () => void;
  _setOriginalImage: (image?: File) => Promise<void>; // use with caution now and refactor later

  toolName: ToolName | null | undefined;
  toolArgs: ToolArgs | undefined;
  startEmptyTool: (tool: ToolName) => void;
  addCanvasToHistory: (toolName: ToolName, args: ToolArgs) => void;
  updateLastHistoryItem: (args: ToolArgs, forceNewEntry?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  crop: CropToolType | null;
  setCrop: (args: CropToolType | null) => void;

  canvasDimensions: string;

  zoom: number;
  setZoom: (zoom: number) => void;

  interactionMode: 'pan' | 'draw' | 'crop';
  setInteractionMode: (mode: 'pan' | 'draw' | 'crop') => void;
}

export const ImageContext = createContext<ImageContextType>({
  // @ts-expect-error smth
  canvasRef: null,
  fileName: '',
  setFileName: () => {},
  originalImage: null,
  openLoadImageDialog: () => {},
  openSaveImageDialog: () => {},
  _setOriginalImage: () => Promise.resolve(),

  toolName: null,
  toolArgs: {},
  startEmptyTool: () => {},
  addCanvasToHistory: () => {},
  updateLastHistoryItem: () => {},
  undo: () => {},
  redo: () => {},
  canUndo: () => false,
  canRedo: () => false,

  crop: null,
  setCrop: () => {},

  canvasDimensions: '',

  zoom: 1,
  setZoom: () => {},

  interactionMode: 'pan',
  setInteractionMode: () => {},
});

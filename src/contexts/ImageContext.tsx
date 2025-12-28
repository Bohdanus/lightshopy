import { createContext } from 'react';
import { toolsMap } from '../tools/toolsMap.ts';

export type Point = { x: number; y: number };

export type ToolName = keyof typeof toolsMap;
export type ToolArgs = Record<string, string | number | Point[]>;

export type HistoryItem = {
  tool: ToolName;
  args: ToolArgs;
  image: HTMLImageElement | null;
};

interface ImageContextType {
  fileName: string;
  setFileName: (name: string) => void;
  originalImage: HTMLImageElement | null;
  currentCtx: CanvasRenderingContext2D | null;
  openLoadImageDialog: () => void;
  openSaveImageDialog: () => void;
  _setOriginalImage: (image?: File) => Promise<void>; // use with caution now and refactor later

  getCurrentTool: () => HistoryItem | undefined;
  startEmptyTool: (tool: ToolName) => void;
  // addToHistory: (toolName: ToolName, args?: ToolArgs) => Promise<void>;
  updateLastHistoryItem: (args: ToolArgs) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export const ImageContext = createContext<ImageContextType>({
  fileName: '',
  setFileName: () => {},
  originalImage: null,
  currentCtx: null,
  openLoadImageDialog: () => {},
  openSaveImageDialog: () => {},
  _setOriginalImage: () => Promise.resolve(),

  getCurrentTool: () => {
    return undefined;
  },
  startEmptyTool: () => {},
  // addToHistory: () => Promise.resolve(),
  updateLastHistoryItem: () => {},
  undo: () => {},
  redo: () => {},
  canUndo: () => false,
  canRedo: () => false,
});

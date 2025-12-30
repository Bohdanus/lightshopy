import { createContext, type RefObject } from 'react';
import { toolsMap } from '../tools/toolsMap.ts';

export type Point = { x: number; y: number };

export type ToolName = keyof typeof toolsMap;
export type ToolArgs = Record<string, string | number | Point[]>;

export type HistoryItem = {
  tool?: ToolName | null;
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
  updateLastHistoryItem: (args: ToolArgs, forceNewEntry?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
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
  updateLastHistoryItem: () => {},
  undo: () => {},
  redo: () => {},
  canUndo: () => false,
  canRedo: () => false,
});

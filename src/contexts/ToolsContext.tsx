import { createContext } from 'react';
import { toolsMap } from '../tools/toolsMap';

export type ToolName = keyof typeof toolsMap;
export type ToolArgs = Record<string, string | number>;

export type HistoryItem = {
  tool: ToolName;
  args: ToolArgs;
};

interface ToolsContextType {
  addToHistoryAndRun: (toolName: ToolName, args?: ToolArgs) => Promise<void>;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export const ToolsContext = createContext<ToolsContextType>({
  addToHistoryAndRun: () => Promise.resolve(),
  undo: () => Promise.resolve(),
  redo: () => Promise.resolve(),
  canUndo: () => false,
  canRedo: () => false,
});

import React, { useState, useContext, type ReactNode } from 'react';
import { ToolsContext, type ToolName, type ToolArgs, type HistoryItem } from './ToolsContext';
import { ImageContext } from './ImageContext';
import { toolsMap } from '../tools/toolsMap';

export const ToolsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentImage, originalImage, setCurrentImage } = useContext(ImageContext);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [positionInHistory, setPositionInHistory] = useState<number>(0);

  async function addToHistoryAndRun(toolName: ToolName, args: ToolArgs = {}) {
    if (!currentImage) return;

    const newHistory = [...history.slice(0, positionInHistory), { tool: toolName, args }];
    setHistory(newHistory);
    setPositionInHistory(newHistory.length);

    const newImage = await toolsMap[toolName](currentImage)(args);
    setCurrentImage(newImage);
  }

  async function recalculateImage(newPosition: number) {
    if (!originalImage) return;

    let image = originalImage;
    for (let i = 0; i < newPosition; i++) {
      const { tool, args } = history[i];
      image = await toolsMap[tool](image)(args);
    }
    setCurrentImage(image);
  }

  async function undo() {
    if (positionInHistory > 0) {
      const newPosition = positionInHistory - 1;
      setPositionInHistory(newPosition);
      await recalculateImage(newPosition);
    }
  }

  function canUndo() {
    return positionInHistory > 0;
  }

  async function redo() {
    if (positionInHistory < history.length) {
      const newPosition = positionInHistory + 1;
      setPositionInHistory(newPosition);
      await recalculateImage(newPosition);
    }
  }

  function canRedo() {
    return positionInHistory < history.length;
  }

  const value = {
    addToHistoryAndRun,
    undo,
    redo,
    canUndo,
    canRedo,
  };

  return <ToolsContext.Provider value={value}>{children}</ToolsContext.Provider>;
};

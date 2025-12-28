import React, { useState, type ReactNode, useRef } from 'react';
import { loadImageFile } from './loadFromFile.ts';
import { saveImage } from './saveToFile.ts';
import SaveDialog from '../components/SaveDialog/SaveDialog.tsx';
import { type HistoryItem, ImageContext, type ToolArgs, type ToolName } from './ImageContext.tsx';
import { toolsMap } from '../tools/toolsMap.ts';
import { lastUsedSettings } from '../tools/settings.ts';

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fileName, setFileName] = useState('');
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  // const [prevHistoryImage, setPrevHistoryImage] = useState<HTMLImageElement | null>(null);
  // const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentEmptyTool, setCurrentEmptyTool] = useState<ToolName | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLength, setHistoryLength] = useState<number>(0);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    await handleImageUpload(file);

    // Reset input so the same file can be selected again if needed
    if (event.target) {
      event.target.value = '';
    }
  };

  async function handleImageUpload(file?: File) {
    // todo add a propmt, because we are overwriting the original image
    if (!file) {
      return;
    }

    try {
      const img = await loadImageFile(file);
      setFileName(file.name);
      setOriginalImage(img);
      clearHistory();
    } catch (error) {
      console.error('Failed to load image:', error);
    }
  }

  const openLoadImageDialog = () => {
    fileInputRef.current?.click();
  };

  const openSaveImageDialog = () => {
    if (getCurrentImage()) {
      setShowSaveDialog(true);
    } else {
      alert('No image to save!');
    }
  };

  const handleSave = (filename: string, format: string) => {
    const success = saveImage(getCurrentImage(), filename, format);
    if (success) {
      setFileName(filename);
    }
  };

  const handleCloseSaveDialog = () => {
    setShowSaveDialog(false);
  };

  function getCurrentImage() {
    if (historyLength === 0) return originalImage;
    return history[historyLength - 1].image;
  }

  function getPrevImage() {
    if (historyLength < 2) return originalImage;
    return history[historyLength - 2].image;
  }

  // function getPrevHistoryImage() {
  //   if (prevHistoryImage) return prevHistoryImage;
  //
  //   if (history.length === 0) {
  //     return originalImage;
  //   }
  //
  //     setPrevHistoryImage(history[history.length - 1].image);
  //   }
  //
  //   return prevHistoryImage;
  // }

  function startEmptyTool(toolName: ToolName) {
    setCurrentEmptyTool(toolName);
    setHistory(history.slice(0, historyLength));
  }

  function getCurrentTool(): HistoryItem | undefined {
    if (currentEmptyTool) {
      return {
        tool: currentEmptyTool,
        // @ts-expect-error: mess with polymorphic args
        args: { ...lastUsedSettings[currentEmptyTool] },
        image: getCurrentImage()!,
      };
    }

    if (historyLength === 0) return undefined;
    return history[historyLength - 1];
  }

  async function addToHistory(toolName: ToolName, args?: ToolArgs) {
    if (!originalImage) return;

    // @ts-expect-error: mess with polymorphic args
    args ??= { ...lastUsedSettings[toolName] } as ToolArgs;

    const image = await toolsMap[toolName].imageProcessor(getCurrentImage())(args);

    const newHistory = [...history.slice(0, historyLength), { tool: toolName, args, image }];
    setCurrentEmptyTool(null);
    setHistory(newHistory);
    setHistoryLength(newHistory.length);
  }

  async function updateLastHistoryItem(args?: ToolArgs) {
    if (!originalImage) return;

    const currentTool = getCurrentTool();
    if (!currentTool) return;

    const replaceLastItem = !!currentEmptyTool;

    args ??= currentTool.args;
    const image = await toolsMap[currentTool.tool].imageProcessor(getPrevImage())(args);
    const newHistoryItem = { tool: currentTool.tool, args, image };

    setCurrentEmptyTool(null);
    setHistory([...history.slice(0, historyLength - (replaceLastItem ? 1 : 0)), newHistoryItem]);
    setHistoryLength(history.length);
  }

  // async function calculateImageToPosition(position: number) {
  //   if (!originalImage) return;
  //
  //   let image = originalImage;
  //   for (let i = 0; i < position; i++) {
  //     const { tool, args } = history[i];
  //     image = await toolsMap[tool](image)(args);
  //   }
  //
  //   return image;
  // }

  async function undo() {
    if (historyLength > 0) {
      setHistoryLength(historyLength - 1);
    }
  }

  function canUndo() {
    return historyLength > 0;
  }

  async function redo() {
    if (historyLength < history.length) {
      setHistoryLength(historyLength + 1);
    }
  }

  function canRedo() {
    return historyLength < history.length;
  }

  function clearHistory() {
    setHistory([]);
    setHistoryLength(0);
  }

  // NOSONAR: React Compiler handles memoization of this object
  const providerValue = {
    fileName,
    setFileName,
    originalImage,
    currentImage: getCurrentImage(),
    openLoadImageDialog,
    openSaveImageDialog,
    _setOriginalImage: handleImageUpload,
    startEmptyTool,
    getCurrentTool,
    addToHistory,
    updateLastHistoryItem,
    undo,
    redo,
    canUndo,
    canRedo,
  };

  return (
    <>
      <ImageContext.Provider value={providerValue}>{children}</ImageContext.Provider>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      {showSaveDialog && (
        <SaveDialog proposedName={`${fileName} (copy)`} onClose={handleCloseSaveDialog} onSave={handleSave} />
      )}
    </>
  );
};

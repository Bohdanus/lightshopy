import React, { useState, type ReactNode, useRef } from 'react';
import { loadImageFile } from './loadFromFile.ts';
import { saveImage } from './saveToFile.ts';
import SaveDialog from '../components/SaveDialog/SaveDialog.tsx';
import { type HistoryItem, ImageContext, type ToolArgs, type ToolName } from './ImageContext.tsx';
import { toolsMap } from '../tools/toolsMap.ts';
import { defaultSettings } from '../tools/settings.ts';
import { isEqual } from 'lodash-es';
import { writeImageToCanvas } from '../tools/functions.ts';

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fileName, setFileName] = useState('');
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  // const [prevHistoryImage, setPrevHistoryImage] = useState<HTMLImageElement | null>(null);
  // const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentEmptyTool, setCurrentEmptyTool] = useState<ToolName | null | undefined>(null);
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
      const canvas = canvasRef.current!;
      writeImageToCanvas(img, canvas);

      setFileName(file.name);
      setOriginalImage(img);
      clearHistory();

      const bitmap = await createImageBitmap(canvas); // or maybe from inage??
      setHistory([
        {
          args: {},
          bitmap,
        },
      ]);
      setHistoryLength(1);
    } catch (error) {
      console.error('Failed to load image:', error);
    }
  }

  const openLoadImageDialog = () => {
    fileInputRef.current?.click();
  };

  const openSaveImageDialog = () => {
    if (getCurrentBitmap()) {
      setShowSaveDialog(true);
    } else {
      alert('No image to save!');
    }
  };

  const handleSave = (filename: string, format: string) => {
    const success = saveImage(canvasRef.current, filename, format);
    if (success) {
      setFileName(filename);
    }
  };

  const handleCloseSaveDialog = () => {
    setShowSaveDialog(false);
  };

  function getCurrentBitmap() {
    return history[historyLength - 1].bitmap!;
  }

  function getPrevBitmap() {
    if (historyLength === 1) {
      return history[0].bitmap!;
    }
    return history[historyLength - 2].bitmap!;
  }

  function getNextBitmap() {
    return history[historyLength].bitmap!;
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

  function saveCurrentBitmap({
    bitmapToDisplay,
    length = historyLength,
  }: { bitmapToDisplay?: ImageBitmap; length?: number } = {}) {
    if (length > 1) {
      createImageBitmap(canvasRef.current!).then((bitmap) => {
        history[length - 1].bitmap = bitmap;
        const ctx = canvasRef.current!.getContext('2d')!;
        ctx.reset();
        ctx.drawImage(bitmapToDisplay ?? bitmap, 0, 0);
      });
    }
  }

  function startEmptyTool(toolName: ToolName) {
    setCurrentEmptyTool(toolName);
    saveCurrentBitmap();
    // if (historyLength > 0) {
    //   canvasRef.current!.toBlob(
    //     (blob) => {
    //       history[historyLength - 1].imageBlob = blob;
    //     },
    //     'image/webp',
    //     1
    //   );
    // }
  }

  function getCurrentTool(): ToolName | null | undefined {
    if (currentEmptyTool) {
      return currentEmptyTool;
    }

    if (historyLength === 0) return null;
    return history[historyLength - 1].tool;
  }

  function getCurrentArgs(): ToolArgs | undefined {
    if (currentEmptyTool) {
      return defaultSettings[currentEmptyTool];
    }
    if (historyLength === 0) return undefined;
    return history[historyLength - 1].args;
  }

  // async function addToHistory(toolName: ToolName, args?: ToolArgs) {
  // if (!originalImage) return;
  //
  // // @ts-expect-error: mess with polymorphic args
  // args ??= { ...defaultSettings[toolName] } as ToolArgs;
  //
  // const image = await toolsMap[toolName].imageProcessor(getCurrentImage())(args);
  //
  // const newHistory = [...history.slice(0, historyLength), { tool: toolName, args, image }];
  // setCurrentEmptyTool(null);
  // setHistory(newHistory);
  // setHistoryLength(newHistory.length);
  // }

  function updateLastHistoryItem(args: ToolArgs, forceNewEntry?: boolean) {
    if (!originalImage) return;

    const toolName = getCurrentTool();
    if (!toolName) return; // shouldn't normally happen, but just in case

    if (toolName !== 'draw' && isEqual(args, defaultSettings[toolName])) {
      if (currentEmptyTool) {
        console.log('currentEmptyTool is not null, but args are equal to defaultSettings');
        // should never happen, but just in case
        return;
      }
      setCurrentEmptyTool(toolName);
      const newHistory = history.slice(0, historyLength - 1);
      setHistory(newHistory);
      setHistoryLength(newHistory.length);
      return;
    }

    const replaceLastItem = forceNewEntry ? false : !currentEmptyTool;

    // should normally have args, but just in case
    args ??= { ...defaultSettings[toolName] };

    if (toolName !== 'draw') {
      toolsMap[toolName].imageProcessor(
        canvasRef.current!,
        replaceLastItem ? getPrevBitmap() : getCurrentBitmap()
      )(args);
    }

    const newHistory = history.slice(0, historyLength - (replaceLastItem ? 1 : 0));
    const newHistoryItem = { tool: toolName, args } as HistoryItem;
    newHistory.push(newHistoryItem);

    if (!replaceLastItem) {
      saveCurrentBitmap({ length: newHistory.length });
    }

    setCurrentEmptyTool(forceNewEntry ? toolName : null);
    setHistory(newHistory);
    setHistoryLength(newHistory.length);
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

  function undo() {
    const toolName = getCurrentTool();
    if (canUndo()) {
      const newLength = historyLength - 1;
      const newToolName = history[newLength - 1]?.tool;
      if (newToolName === toolName) {
        setCurrentEmptyTool(null);
      } else {
        setCurrentEmptyTool(toolName ?? null);
      }
      setHistoryLength(newLength);

      saveCurrentBitmap({ bitmapToDisplay: getPrevBitmap() });
    }
  }

  function canUndo() {
    return historyLength > 1;
  }

  function redo() {
    const toolName = getCurrentTool();
    if (canRedo()) {
      const newLength = historyLength + 1;
      const newToolName = history[newLength - 1]?.tool;
      if (newToolName === toolName) {
        setCurrentEmptyTool(null);
      } else {
        setCurrentEmptyTool(toolName ?? null);
      }
      setHistoryLength(newLength);

      const ctx = canvasRef.current!.getContext('2d')!;
      ctx.reset();
      ctx.drawImage(getNextBitmap(), 0, 0);
    }
  }

  function canRedo() {
    return historyLength < history.length;
  }

  function clearHistory() {
    if (!currentEmptyTool && historyLength > 0) {
      setCurrentEmptyTool(history[historyLength - 1].tool);
    }
  }

  // NOSONAR: React Compiler handles memoization of this object
  const providerValue = {
    canvasRef,
    fileName,
    setFileName,
    originalImage,
    openLoadImageDialog,
    openSaveImageDialog,
    _setOriginalImage: handleImageUpload,
    toolName: getCurrentTool(),
    toolArgs: getCurrentArgs(),
    startEmptyTool,
    // addToHistory,
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

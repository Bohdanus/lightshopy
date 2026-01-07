// the idea is to hold here the last used settings
// localStorage
// use default initially

import { type ToolArgs, type ToolName } from '../contexts/ImageContext.tsx';
import type { PenType } from './draw.ts';

type DrawSettings = {
  alpha: number;
  color?: string;
  size: number;
};

export const savedDrawPerPen: Record<PenType, DrawSettings> = {
  pen: { alpha: 1, size: 10 },
  marker: { alpha: 0.5, size: 20 },
  highlighter: { alpha: 0.75, size: 35 },
  vivid: { alpha: 0.9, size: 40 },
  eraser: { alpha: 1, size: 100 },
};

export const defaultSettings: Record<ToolName, ToolArgs> = {
  blur: { radius: 0 },
  colors: { grayscale: 0, sepia: 0, saturation: 0 },
  levels: { brightness: 0, contrast: 0 },
  transform: { rotate: 0, mirrorH: 0, mirrorV: 0 },
  crop: { x: 0, y: 0, width: 0, height: 0 },
  draw: { ...savedDrawPerPen['pen'], color: '#000000', points: [], penType: 'pen' },
};

export const savedLastSettings: Record<ToolName, ToolArgs> = {
  draw: defaultSettings.draw,
};

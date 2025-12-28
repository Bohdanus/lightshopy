// the idea is to hold here the last used settings
// localStorage
// use default initially

import type { ToolArgs, ToolName } from '../contexts/ImageContext.tsx';

export const defaultSettings: Record<ToolName, ToolArgs> = {
  blur: { radius: 0 },
  colors: { grayscale: 0, sepia: 0, saturation: 0 },
  levels: { brightness: 0, contrast: 0 },
  transform: { rotate: 0, mirrorH: 0, mirrorV: 0 },
  draw: { color: '#000000', size: 5, points: [] },
};

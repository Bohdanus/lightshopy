// the idea is to hold here the last used settings
// localStorage
// use default initially

import type { ToolArgs, ToolName } from '../contexts/ImageContext.tsx';

export const defaultSettings: Record<ToolName, ToolArgs> = {
  blur: { radius: 5 },
  colors: { grayscale: 0, sepia: 0, saturation: 0 },
  levels: { brightness: 0, contrast: 0 },
};

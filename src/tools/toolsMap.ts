import { blur } from './blur';
import { colors } from './colors';
import { levels } from './levels';
import type { ToolArgs } from '../contexts/ImageContext.tsx';
import { defaultSettings } from './settings.ts';
import Colors from '../components/ToolbarsRight/Colors/Colors.tsx';
import Blur from '../components/ToolbarsRight/Blur/Blur.tsx';
import Levels from '../components/ToolbarsRight/Levels/Levels.tsx';
import type { ToolbarRightComponent } from '../components/ToolbarsRight/types.ts';

type ToolsMap = Record<
  string,
  {
    icon: string;
    imageProcessor: (image: HTMLImageElement | null) => (args: ToolArgs) => HTMLImageElement | null;
    defaultSettings: ToolArgs;
    toolboxComponent: ToolbarRightComponent;
  }
>;

export const toolsMap: ToolsMap = {
  blur: {
    icon: 'blur',
    imageProcessor: blur,
    defaultSettings: defaultSettings.blur,
    toolboxComponent: Blur,
  },
  colors: {
    icon: 'colors',
    imageProcessor: colors,
    defaultSettings: defaultSettings.colors,
    toolboxComponent: Colors,
  },
  levels: {
    icon: 'levels',
    imageProcessor: levels,
    defaultSettings: defaultSettings.levels,
    toolboxComponent: Levels,
  },
};

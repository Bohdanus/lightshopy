import React from 'react';
import type { ToolArgs } from '../../contexts/ImageContext.tsx';

export type ToolbarRightComponent = React.FC<{
  args: ToolArgs;
  onChange: (args: ToolArgs) => void;
}>;

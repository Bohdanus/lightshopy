import React, { useMemo, useEffect } from 'react';
import './Draw.scss';
import { throttle } from 'lodash-es';
import { THROTTLE_TIME } from '../../../constants';
import UndoButton from '../../Common/UndoButton.tsx';
import type { Point } from '../../../contexts/ImageContext.tsx';

interface DrawToolbarProps {
  args: { color?: string; size?: number; points?: Point[] };
  onChange: (args: { color: string; size: number; points: Point[] }) => void;
}

const Draw: React.FC<DrawToolbarProps> = ({ args, onChange }) => {
  const throttledOnChange = useMemo(() => throttle(onChange, THROTTLE_TIME), [onChange]);

  useEffect(() => {
    return () => {
      throttledOnChange.cancel();
    };
  }, [throttledOnChange]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    // @ts-expect-error: mess with polymorphic args
    throttledOnChange({ ...args, color });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(event.target.value);
    // @ts-expect-error: mess with polymorphic args
    throttledOnChange({ ...args, size });
  };

  const { color, points, size } = args;
  const hasDefaultValues = points!.length === 0;

  return (
    <div className="draw-toolbar">
      <div className="input-group">
        <label htmlFor="color-picker">Color</label>
        <input id="color-picker" type="color" value={color} onChange={handleColorChange} className="draw-color" />
      </div>

      <div className="slider-group">
        <label htmlFor="size-slider">Brush Size</label>
        <input
          id="size-slider"
          type="range"
          min="1"
          max="100"
          value={size}
          onChange={handleSizeChange}
          className="draw-slider"
        />
        <span>
          <b>{size}px</b>
        </span>
      </div>

      <UndoButton disabled={hasDefaultValues} />
    </div>
  );
};

export default Draw;

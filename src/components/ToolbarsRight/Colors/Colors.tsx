import React, { useMemo, useEffect } from 'react';
import './Colors.scss';
import { defaultSettings } from '../../../tools/settings.ts';
import { isEqual, throttle } from 'lodash-es';
import { THROTTLE_TIME } from '../../../constants';
import UndoButton from '../../Common/UndoButton.tsx';

interface ColorsToolbarProps {
  args: { grayscale?: number; sepia?: number; saturation?: number };
  onChange: (args: { grayscale: number; sepia: number; saturation: number }) => void;
}

const Colors: React.FC<ColorsToolbarProps> = ({ args, onChange }) => {
  const throttledOnChange = useMemo(() => throttle(onChange, THROTTLE_TIME), [onChange]);

  useEffect(() => {
    return () => {
      throttledOnChange.cancel();
    };
  }, [throttledOnChange]);

  const handleGrayscaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const grayscale = Number(event.target.value);
    // @ts-expect-error: mess with polymorphic args
    throttledOnChange({ ...args, grayscale });
  };

  const handleSepiaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sepia = Number(event.target.value);
    // @ts-expect-error: mess with polymorphic args
    throttledOnChange({ ...args, sepia });
  };

  const handleSaturationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const saturation = Number(event.target.value);
    // @ts-expect-error: mess with polymorphic args
    throttledOnChange({ ...args, saturation });
  };

  const { grayscale, sepia, saturation } = args;
  const hasDefaultValues = isEqual(args, defaultSettings.colors);

  return (
    <div className="colors-toolbar">
      <div className="slider-group">
        <label htmlFor="grayscale-slider">Grayscale</label>
        <input
          id="grayscale-slider"
          type="range"
          min="0"
          max="100"
          value={grayscale}
          onChange={handleGrayscaleChange}
          className="colors-slider"
        />
        <span>
          <b>{grayscale}%</b>
        </span>
      </div>

      <div className="slider-group">
        <label htmlFor="sepia-slider">Sepia</label>
        <input
          id="sepia-slider"
          type="range"
          min="0"
          max="100"
          value={sepia}
          onChange={handleSepiaChange}
          className="colors-slider"
        />
        <span>
          <b>{sepia}%</b>
        </span>
      </div>

      <div className="slider-group">
        <label htmlFor="saturation-slider">Saturation</label>
        <input
          id="saturation-slider"
          type="range"
          min={0}
          max={100}
          value={saturation}
          onChange={handleSaturationChange}
          className="colors-slider"
        />
        <span>
          <b>{saturation}%</b>
        </span>
      </div>

      <UndoButton disabled={hasDefaultValues} />
    </div>
  );
};

export default Colors;

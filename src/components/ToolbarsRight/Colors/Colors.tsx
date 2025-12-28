import React, { useMemo, useEffect } from 'react';
import './Colors.scss';
import { lastUsedSettings } from '../../../tools/settings.ts';
import { throttle } from 'lodash';
import { THROTTLE_TIME } from '../../../constants';

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

  const grayscale = args.grayscale ?? lastUsedSettings.colors.grayscale;
  const sepia = args.sepia ?? lastUsedSettings.colors.sepia;
  const saturation = args.saturation ?? lastUsedSettings.colors.saturation;

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
    </div>
  );
};

export default Colors;

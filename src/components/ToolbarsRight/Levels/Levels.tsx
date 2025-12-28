import React, { useMemo, useEffect } from 'react';
import './Levels.scss';
import { defaultSettings } from '../../../tools/settings.ts';
import { isEqual, throttle } from 'lodash-es';
import { THROTTLE_TIME } from '../../../constants';
import UndoButton from '../../Common/UndoButton.tsx';

interface LevelsToolbarProps {
  args: { brightness?: number; contrast?: number };
  onChange: (args: { brightness: number; contrast: number }) => void;
}

const Levels: React.FC<LevelsToolbarProps> = ({ args, onChange }) => {
  const throttledOnChange = useMemo(() => throttle(onChange, THROTTLE_TIME), [onChange]);

  useEffect(() => {
    return () => {
      throttledOnChange.cancel();
    };
  }, [throttledOnChange]);

  const handleBrightnessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = Number(event.target.value);
    // @ts-expect-error: mess with polymorphic args
    throttledOnChange({ ...args, brightness });
  };

  const handleContrastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const contrast = Number(event.target.value);
    // @ts-expect-error: mess with polymorphic args
    throttledOnChange({ ...args, contrast });
  };

  const { brightness, contrast } = args;
  const hasDefaultValues = isEqual(args, defaultSettings.levels);

  return (
    <div className="levels-toolbar">
      <div className="slider-group">
        <label htmlFor="brightness-slider">Brightness</label>
        <input
          id="brightness-slider"
          type="range"
          min={-100}
          max={100}
          value={brightness}
          onChange={handleBrightnessChange}
          className="levels-slider"
        />
        <span>
          <b>{brightness}%</b>
        </span>
      </div>
      <div className="slider-group">
        <label htmlFor="contrast-slider">Contrast</label>
        <input
          id="contrast-slider"
          type="range"
          min={-100}
          max={100}
          value={contrast}
          onChange={handleContrastChange}
          className="levels-slider"
        />
        <span>
          <b>{contrast}%</b>
        </span>
      </div>

      <UndoButton disabled={hasDefaultValues} />
    </div>
  );
};

export default Levels;

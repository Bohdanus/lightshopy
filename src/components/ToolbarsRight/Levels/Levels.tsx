import React, { useMemo, useEffect } from 'react';
import './Levels.scss';
import { lastUsedSettings } from '../../../tools/settings.ts';
import { throttle } from 'lodash';
import { THROTTLE_TIME } from '../../../constants';

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

  const brightness = args.brightness ?? lastUsedSettings.levels.brightness;
  const contrast = args.contrast ?? lastUsedSettings.levels.contrast;

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
          Value: <b>{brightness}%</b>
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
          Value: <b>{contrast}%</b>
        </span>
      </div>
    </div>
  );
};

export default Levels;

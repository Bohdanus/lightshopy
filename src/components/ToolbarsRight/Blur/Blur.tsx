import React, { useMemo, useEffect } from 'react';
import './Blur.scss';
import { lastUsedSettings } from '../../../tools/settings.ts';
import { throttle } from 'lodash';
import { THROTTLE_TIME } from '../../../constants';

interface BlurToolbarProps {
  args: { radius?: number };
  onChange: (args: { radius: number }) => void;
}

const Blur: React.FC<BlurToolbarProps> = ({ args, onChange }) => {
  const throttledOnChange = useMemo(() => throttle(onChange, THROTTLE_TIME), [onChange]);

  useEffect(() => {
    return () => {
      throttledOnChange.cancel();
    };
  }, [throttledOnChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    throttledOnChange({ radius: Number(event.target.value) });
  };
  const value = args.radius ?? lastUsedSettings.blur.radius;

  return (
    <div className="blur-toolbar">
      <label htmlFor="blur-slider">Blur Radius</label>
      <input
        id="blur-slider"
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={handleChange}
        className="blur-slider"
      />
      <span>
        Radius: <b>{value}px</b>
      </span>
    </div>
  );
};

export default Blur;

import React, { useMemo, useEffect } from 'react';
import './Blur.scss';
import { defaultSettings } from '../../../tools/settings.ts';
import { isEqual, throttle } from 'lodash-es';
import { THROTTLE_TIME } from '../../../constants';

import UndoButton from '../../Common/UndoButton.tsx';

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
  const { radius } = args;
  const hasDefaultValues = isEqual(args, defaultSettings.blur);

  return (
    <div className="blur-toolbar">
      <label htmlFor="blur-slider">Blur Radius</label>
      <input
        id="blur-slider"
        type="range"
        min="1"
        max="100"
        value={radius}
        onChange={handleChange}
        className="blur-slider"
      />
      <span>
        Radius: <b>{radius}px</b>
      </span>

      <UndoButton disabled={hasDefaultValues} />
    </div>
  );
};

export default Blur;

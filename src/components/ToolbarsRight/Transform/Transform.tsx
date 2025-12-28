import React, { useEffect, useMemo } from 'react';
import './Transform.scss';
import { defaultSettings } from '../../../tools/settings.ts';
import { isEqual, throttle } from 'lodash-es';
import { THROTTLE_TIME } from '../../../constants';
import UndoButton from '../../Common/UndoButton.tsx';

interface TransformToolbarProps {
  args: { rotate?: number; mirrorH?: number; mirrorV?: number };
  onChange: (args: { rotate: number; mirrorH: number; mirrorV: number }) => void;
}

const Transform: React.FC<TransformToolbarProps> = ({ args, onChange }) => {
  const rotate = args.rotate ?? 0;
  const mirrorH = args.mirrorH ?? 0;
  const mirrorV = args.mirrorV ?? 0;

  const throttledOnChange = useMemo(() => throttle(onChange, THROTTLE_TIME), [onChange]);

  useEffect(() => {
    return () => {
      throttledOnChange.cancel();
    };
  }, [throttledOnChange]);

  const handleRotateLeft = () => {
    let newRotate = rotate - 90;
    if (newRotate < 0) newRotate += 360;
    onChange({ rotate: newRotate, mirrorH, mirrorV });
  };

  const handleRotateRight = () => {
    let newRotate = rotate + 90;
    if (newRotate >= 360) newRotate -= 360;
    onChange({ rotate: newRotate, mirrorH, mirrorV });
  };

  const handleRotateSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRotate = Number(event.target.value);
    throttledOnChange({ rotate: newRotate, mirrorH, mirrorV });
  };

  const toggleMirrorH = () => {
    onChange({ rotate, mirrorH: mirrorH ? 0 : 1, mirrorV });
  };

  const toggleMirrorV = () => {
    onChange({ rotate, mirrorH, mirrorV: mirrorV ? 0 : 1 });
  };

  const hasDefaultValues = isEqual(args, defaultSettings.transform);

  return (
    <div className="transform-toolbar">
      <div className="button-group">
        <label>Rotate</label>
        <div className="buttons">
          <button onClick={handleRotateLeft} title="Rotate Left">
            ↺
          </button>
          <button onClick={handleRotateRight} title="Rotate Right">
            ↻
          </button>
        </div>
      </div>

      <div className="slider-group">
        <label htmlFor="rotate-slider">Rotate Degree</label>
        <input
          id="rotate-slider"
          type="range"
          min={-90}
          max={90}
          value={rotate}
          onChange={handleRotateSliderChange}
          className="transform-slider"
        />
        <span>
          <b>{rotate}°</b>
        </span>
      </div>

      <div className="button-group">
        <label>Mirror</label>
        <div className="buttons">
          <button className={mirrorH ? 'active' : ''} onClick={toggleMirrorH} title="Mirror Horizontal">
            ↔
          </button>
          <button className={mirrorV ? 'active' : ''} onClick={toggleMirrorV} title="Mirror Vertical">
            ↕
          </button>
        </div>
      </div>

      <UndoButton disabled={hasDefaultValues} />
    </div>
  );
};

export default Transform;

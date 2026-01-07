import React, { type ChangeEvent, useContext, useState } from 'react';
import './Draw.scss';
import type { DrawToolNoPoints } from '../../../tools/draw.ts';
import { savedDrawPerPen, savedLastSettings } from '../../../tools/settings.ts';
import { ImageContext } from '../../../contexts/ImageContext.tsx';

const Draw: React.FC = () => {
  const { interactionMode, zoom } = useContext(ImageContext);
  const [args, setArgs] = useState<DrawToolNoPoints>(savedLastSettings.draw as DrawToolNoPoints);

  const handleChange = (args: DrawToolNoPoints) => {
    savedLastSettings.draw = args;
    savedDrawPerPen[args.penType] = { alpha: args.alpha, color: args.color, size: args.size };
    setArgs(args);
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    handleChange({ ...args, color });
  };

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const size = Number(event.target.value);
    handleChange({ ...args, size });
  };

  const handleAlphaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const alpha = Number(event.target.value);
    handleChange({ ...args, alpha });
  };

  // const handlePenTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const penType = event.target.value as PenType;
  //   handleChange({ ...args, ...savedDrawPerPen[penType], penType });
  // };

  const { alpha, color, size, penType } = args;
  // const hasDefaultValues = points!.length === 0;

  return (
    <div className="draw-toolbar" style={{ opacity: interactionMode === 'draw' ? 1 : 0.5 }}>
      {/*<div className="mb-3">*/}
      {/*  <label htmlFor="pen-type" className="form-label">*/}
      {/*    Pen Type*/}
      {/*  </label>*/}
      {/*  <select id="pen-type" value={penType} onChange={handlePenTypeChange} className="form-select">*/}
      {/*    <option value="pen">Pen</option>*/}
      {/*    <option value="marker">Marker</option>*/}
      {/*    /!*<option value="highlighter">Highlighter</option>*!/*/}
      {/*    /!*<option value="vivid">Vivid</option>*!/*/}
      {/*    /!*<option value="eraser">Eraser</option>*!/*/}
      {/*  </select>*/}
      {/*</div>*/}

      <div className="mb-3">
        <label htmlFor="color-picker" className="form-label">
          Color
        </label>
        <input
          id="color-picker"
          type="color"
          value={color}
          onChange={handleColorChange}
          className="form-control form-control-color w-100"
          disabled={penType === 'eraser'}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="size-slider" className="form-label d-flex justify-content-between">
          Brush Size
          <span>
            <b>{size}px</b>
          </span>
        </label>
        <input
          id="size-slider"
          type="range"
          min="1"
          max="400"
          value={size}
          onChange={handleSizeChange}
          className="form-range"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="alpha-slider" className="form-label d-flex justify-content-between">
          Opacity
          <span>
            <b>{Math.round(alpha * 100)}%</b>
          </span>
        </label>
        <input
          id="alpha-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={alpha}
          onChange={handleAlphaChange}
          className="form-range"
        />
      </div>

      <div
        className="d-flex justify-content-center align-items-center mt-4 border rounded bg-light"
        style={{ minHeight: '220px' }}
      >
        <div
          style={{
            width: `${size * zoom}px`,
            height: `${size * zoom}px`,
            backgroundColor: color,
            opacity: alpha,
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
};

export default Draw;

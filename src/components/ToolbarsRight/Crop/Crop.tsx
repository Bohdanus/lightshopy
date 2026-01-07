import React, { useContext } from 'react';
import './Crop.scss';
import { ImageContext } from '../../../contexts/ImageContext.tsx';
import { defaultSettings } from '../../../tools/settings.ts';
import { isEqual } from 'lodash-es';

interface CropToolbarProps {
  args: { x: number; y: number; width: number; height: number };
  onChange: (args: { x: number; y: number; width: number; height: number }) => void;
}

const Crop: React.FC<CropToolbarProps> = ({ args, onChange }) => {
  const { originalImage, cancelTool } = useContext(ImageContext);

  const handleApply = () => {
    if (args.width > 0 && args.height > 0) {
      onChange(args);
      cancelTool();
    }
  };

  const hasDefaultValues = isEqual(args, defaultSettings.crop);

  return (
    <div className="crop-toolbar">
      <div className="crop-info">
        <div className="info-row">
          <label>X:</label>
          <span>{args.x}px</span>
        </div>
        <div className="info-row">
          <label>Y:</label>
          <span>{args.y}px</span>
        </div>
        <div className="info-row">
          <label>Width:</label>
          <span>{args.width}px</span>
        </div>
        <div className="info-row">
          <label>Height:</label>
          <span>{args.height}px</span>
        </div>
      </div>

      <button
        className="btn btn-primary w-100 mt-3"
        disabled={hasDefaultValues || !originalImage || args.width === 0 || args.height === 0}
        onClick={handleApply}
      >
        Apply Crop
      </button>

      <button className="btn btn-outline-secondary w-100 mt-2" onClick={cancelTool}>
        Cancel
      </button>
    </div>
  );
};

export default Crop;

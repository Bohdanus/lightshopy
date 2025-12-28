import React, { useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext.tsx';

interface UndoButtonProps {
  disabled: boolean;
  text?: string;
}

const UndoButton: React.FC<UndoButtonProps> = ({ disabled, text }) => {
  const { undo } = useContext(ImageContext);

  return (
    <button
      className="btn btn-secondary btn-sm mt-2"
      disabled={disabled}
      onClick={undo}
      style={disabled ? { opacity: 0.55 } : {}}
    >
      {text ?? 'Reset'}
    </button>
  );
};

export default UndoButton;

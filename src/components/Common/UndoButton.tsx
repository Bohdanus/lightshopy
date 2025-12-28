import React, { useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext.tsx';

interface UndoButtonProps {
  disabled: boolean;
}

const UndoButton: React.FC<UndoButtonProps> = ({ disabled }) => {
  const { undo } = useContext(ImageContext);

  return (
    <button
      className="btn btn-secondary btn-sm mt-2"
      disabled={disabled}
      onClick={undo}
      style={disabled ? { opacity: 0.55 } : {}}
    >
      Undo
    </button>
  );
};

export default UndoButton;

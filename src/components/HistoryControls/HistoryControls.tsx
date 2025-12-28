import { useContext } from 'react';
import './HistoryControls.scss';
import { ImageContext } from '../../contexts/ImageContext.tsx';

const HistoryControls = () => {
  const { undo, redo, canUndo, canRedo } = useContext(ImageContext);

  return (
    <div className="history-controls d-flex gap-1">
      <button className="btn-history" onClick={undo} disabled={!canUndo()} aria-label="Undo" title="Undo">
        ↩️
      </button>
      <button className="btn-history" onClick={redo} disabled={!canRedo()} aria-label="Redo" title="Redo">
        ↪️
      </button>
    </div>
  );
};

export default HistoryControls;

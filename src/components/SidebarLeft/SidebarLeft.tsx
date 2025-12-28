import { useContext } from 'react';

import './Sidebar.scss';
import { ImageContext } from '../../contexts/ImageContext.tsx';

const SidebarLeft = () => {
  const { currentCtx, startEmptyTool } = useContext(ImageContext);

  const handleColors = () => {
    startEmptyTool('colors');
  };

  const handleBlur = () => {
    startEmptyTool('blur');
  };

  const handleLevels = () => {
    startEmptyTool('levels');
  };

  const handleTransform = () => {
    startEmptyTool('transform');
  };

  const handleDraw = () => {
    startEmptyTool('draw');
  };

  return (
    <aside className="sidebar sidebar-left d-none d-md-block">
      <div className="p-3">
        <h5>Toolbox</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="nav-link" disabled={!currentCtx} onClick={handleColors}>
              Colors
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!currentCtx} onClick={handleBlur}>
              Blur
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!currentCtx} onClick={handleLevels}>
              Levels
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!currentCtx} onClick={handleTransform}>
              Transform
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!currentCtx} onClick={handleDraw}>
              Draw
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarLeft;

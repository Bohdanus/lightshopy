import { useContext } from 'react';

import './Sidebar.scss';
import { ImageContext } from '../../contexts/ImageContext.tsx';

const SidebarLeft = () => {
  const { currentImage, startEmptyTool } = useContext(ImageContext);

  const handleColors = () => {
    startEmptyTool('colors');
  };

  const handleBlur = () => {
    startEmptyTool('blur');
  };

  const handleLevels = () => {
    startEmptyTool('levels');
  };

  return (
    <aside className="sidebar sidebar-left d-none d-md-block">
      <div className="p-3">
        <h5>Toolbox</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="nav-link" disabled={!currentImage} onClick={handleColors}>
              Colors
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!currentImage} onClick={handleBlur}>
              Blur
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!currentImage} onClick={handleLevels}>
              Levels
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarLeft;

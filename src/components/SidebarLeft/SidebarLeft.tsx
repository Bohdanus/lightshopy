import { useContext } from 'react';

import './Sidebar.scss';
import { ImageContext } from '../../contexts/ImageContext.tsx';

const SidebarLeft = () => {
  const { originalImage, startEmptyTool } = useContext(ImageContext);

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

  const handleCrop = () => {
    startEmptyTool('crop');
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
            <button className="nav-link" disabled={!originalImage} onClick={handleColors}>
              Colors
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!originalImage} onClick={handleBlur}>
              Blur
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!originalImage} onClick={handleLevels}>
              Levels
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!originalImage} onClick={handleTransform}>
              Transform
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!originalImage} onClick={handleCrop}>
              Crop
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" disabled={!originalImage} onClick={handleDraw}>
              Draw
            </button>
          </li>
        </ul>

        {/*<hr />*/}
        {/*<Zoom />*/}
        {/*<div className="btn-group w-100 mt-3" role="group">*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className={`btn btn-sm ${interactionMode === 'pan' ? 'btn-primary' : 'btn-outline-primary'}`}*/}
        {/*    onClick={() => setInteractionMode('pan')}*/}
        {/*  >*/}
        {/*    Pan*/}
        {/*  </button>*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className={`btn btn-sm ${interactionMode === 'draw' ? 'btn-primary' : 'btn-outline-primary'}`}*/}
        {/*    onClick={() => setInteractionMode('draw')}*/}
        {/*  >*/}
        {/*    Draw*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </aside>
  );
};

export default SidebarLeft;

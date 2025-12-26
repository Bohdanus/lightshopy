import { useContext } from 'react';

import './Sidebar.scss';
import { ToolsContext } from '../../contexts/ToolsContext';

const SidebarLeft = () => {
  const { addToHistoryAndRun } = useContext(ToolsContext);

  const handleGrayscale = async () => {
    await addToHistoryAndRun('grayscale');
  };

  const handleBlur = async () => {
    await addToHistoryAndRun('blur');
  };

  return (
    <aside className="sidebar sidebar-left d-none d-md-block">
      <div className="p-3">
        <h5>Toolbox</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="nav-link" onClick={handleGrayscale}>
              Grayscale
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={handleBlur}>
              Blur
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarLeft;

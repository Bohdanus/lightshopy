import '../SidebarLeft/Sidebar.scss';
import { useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext.tsx';
import { toolsMap } from '../../tools/toolsMap.ts';

const SidebarRight = () => {
  const { getCurrentTool, updateLastHistoryItem } = useContext(ImageContext);
  const currentTool = getCurrentTool();

  if (!currentTool) {
    return (
      <aside className="sidebar sidebar-right d-none d-md-block">
        <div className="p-3"></div>
      </aside>
    );
  }

  const { tool, args } = currentTool;
  const Component = toolsMap[tool].toolboxComponent;

  return (
    <aside className="sidebar sidebar-right d-none d-md-block">
      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Component args={args} onChange={updateLastHistoryItem} />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarRight;

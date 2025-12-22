
import './Sidebar.scss';

const SidebarLeft = () => {
  return (
    <aside className="sidebar sidebar-left d-none d-md-block">
      <div className="p-3">
        <h5>Toolbox Left</h5>
        <ul className="nav flex-column">
          <li className="nav-item"><a className="nav-link" href="#">Tool 1</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Tool 2</a></li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarLeft;

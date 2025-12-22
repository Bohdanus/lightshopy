
import '../SidebarLeft/Sidebar.scss';

const SidebarRight = () => {
  return (
    <aside className="sidebar sidebar-right d-none d-md-block">
      <div className="p-3">
        <h5>Toolbox Right</h5>
        <ul className="nav flex-column">
          <li className="nav-item"><a className="nav-link" href="#">Property 1</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Property 2</a></li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarRight;

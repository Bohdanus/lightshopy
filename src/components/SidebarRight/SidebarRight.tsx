import '../SidebarLeft/Sidebar.scss';

const SidebarRight = () => {
  return (
    <aside className="sidebar sidebar-right d-none d-md-block">
      <div className="p-3">
        <ul className="nav flex-column"></ul>
      </div>
    </aside>
  );
};

export default SidebarRight;


import AppMenu from '../AppMenu/AppMenu';

const DesktopHeader = () => {
  return (
    <header className="navbar navbar-expand-md navbar-dark bg-dark d-none d-md-flex px-3">
      <a className="navbar-brand" href="#">Photo App</a>
      <div className="collapse navbar-collapse">
        <AppMenu />
      </div>
      <div className="ms-auto text-light">
        Desktop Header
      </div>
    </header>
  );
};

export default DesktopHeader;

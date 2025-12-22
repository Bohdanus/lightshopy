interface DesktopHeaderProps {
  onOpenClick: () => void;
  onSaveClick: () => void;
}

const DesktopHeader = ({ onOpenClick, onSaveClick }: DesktopHeaderProps) => {
  return (
    <header className="navbar navbar-expand-md navbar-dark bg-dark d-none d-md-flex px-3">
      <a className="navbar-brand" href="#">
        Photo App
      </a>
      <ul className="navbar-nav me-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="fileDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            File
          </a>
          <ul className="dropdown-menu" aria-labelledby="fileDropdown">
            <li>
              <button className="dropdown-item" type="button" onClick={onOpenClick}>
                Open
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button" onClick={onSaveClick}>
                Save
              </button>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="editDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Edit
          </a>
          <ul className="dropdown-menu" aria-labelledby="editDropdown">
            <li>
              <button className="dropdown-item" type="button">
                Levels
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Effects
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <div className="ms-auto text-light">Desktop Header</div>
    </header>
  );
};

export default DesktopHeader;

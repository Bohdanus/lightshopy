
interface AppMenuProps {
  isMobile?: boolean;
}

const AppMenu = ({ isMobile = false }: AppMenuProps) => {
  if (isMobile) {
    return (
      <div className="accordion accordion-flush" id="menuAccordion">
        <div className="accordion-item bg-transparent">
          <h2 className="accordion-header" id="headingFile">
            <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFile" aria-expanded="false" aria-controls="collapseFile">
              File
            </button>
          </h2>
          <div id="collapseFile" className="accordion-collapse collapse" aria-labelledby="headingFile" data-bs-parent="#menuAccordion">
            <div className="accordion-body p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent border-0 ps-4"><a className="text-decoration-none text-dark d-block w-100" href="#">Open</a></li>
                <li className="list-group-item bg-transparent border-0 ps-4"><a className="text-decoration-none text-dark d-block w-100" href="#">Save</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item bg-transparent">
          <h2 className="accordion-header" id="headingEdit">
            <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEdit" aria-expanded="false" aria-controls="collapseEdit">
              Edit
            </button>
          </h2>
          <div id="collapseEdit" className="accordion-collapse collapse" aria-labelledby="headingEdit" data-bs-parent="#menuAccordion">
            <div className="accordion-body p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent border-0 ps-4"><a className="text-decoration-none text-dark d-block w-100" href="#">Levels</a></li>
                <li className="list-group-item bg-transparent border-0 ps-4"><a className="text-decoration-none text-dark d-block w-100" href="#">Effects</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="navbar-nav me-auto">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="fileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          File
        </a>
        <ul className="dropdown-menu" aria-labelledby="fileDropdown">
          <li><a className="dropdown-item" href="#">Open</a></li>
          <li><a className="dropdown-item" href="#">Save</a></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="editDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Edit
        </a>
        <ul className="dropdown-menu" aria-labelledby="editDropdown">
          <li><a className="dropdown-item" href="#">Levels</a></li>
          <li><a className="dropdown-item" href="#">Effects</a></li>
        </ul>
      </li>
    </ul>
  );
};

export default AppMenu;

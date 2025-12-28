import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext';
import HistoryControls from '../HistoryControls/HistoryControls';

const DesktopHeader = () => {
  const { startEmptyTool, openLoadImageDialog, openSaveImageDialog } = useContext(ImageContext);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fileMenuRef = useRef<HTMLLIElement>(null);
  const editMenuRef = useRef<HTMLLIElement>(null);

  const handleColors = () => {
    startEmptyTool('colors');
    setOpenMenu(null);
  };

  const handleBlur = () => {
    startEmptyTool('blur');
    setOpenMenu(null);
  };

  const handleLevels = () => {
    startEmptyTool('levels');
    setOpenMenu(null);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (openMenu === 'file' && fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
      if (openMenu === 'edit' && editMenuRef.current && !editMenuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    },
    [openMenu]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <header className="navbar navbar-expand-md navbar-dark bg-dark d-none d-md-flex px-3">
      <a className="navbar-brand" href="#">
        Logo
      </a>
      <ul className="navbar-nav me-auto">
        <li className="nav-item dropdown" ref={fileMenuRef}>
          <button
            className="nav-link dropdown-toggle"
            type="button"
            onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
          >
            File
          </button>
          <ul className="dropdown-menu" style={{ display: openMenu === 'file' ? 'block' : 'none' }}>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                  openLoadImageDialog();
                  setOpenMenu(null);
                }}
              >
                Open
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                  openSaveImageDialog();
                  setOpenMenu(null);
                }}
              >
                Save
              </button>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown" ref={editMenuRef}>
          <button
            className="nav-link dropdown-toggle"
            type="button"
            onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}
          >
            Edit
          </button>
          <ul className="dropdown-menu" style={{ display: openMenu === 'edit' ? 'block' : 'none' }}>
            <li>
              <button className="dropdown-item" type="button" onClick={handleColors}>
                Colors
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button" onClick={handleBlur}>
                Blur
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button" onClick={handleLevels}>
                Levels
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <div className="navbar-nav ms-auto">
        <HistoryControls />
      </div>
    </header>
  );
};

export default DesktopHeader;

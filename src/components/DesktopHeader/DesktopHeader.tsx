import { useState, useEffect, useRef, useCallback } from 'react';
import { useImage } from '../../contexts/ImageContext.tsx';
import { applyGrayscale } from '../../tools/grayscale.ts';
import { applyBlur } from '../../tools/blur.ts';

interface DesktopHeaderProps {
  onOpenClick: () => void;
  onSaveClick: () => void;
}

const DesktopHeader = ({ onOpenClick, onSaveClick }: DesktopHeaderProps) => {
  const { image, setImage } = useImage();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fileMenuRef = useRef<HTMLLIElement>(null);
  const editMenuRef = useRef<HTMLLIElement>(null);

  const handleGrayscale = async () => {
    const newImg = await applyGrayscale(image);
    setImage(newImg);
    setOpenMenu(null);
  };

  const handleBlur = async () => {
    const newImg = await applyBlur(image);
    setImage(newImg);
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
                  onOpenClick();
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
                  onSaveClick();
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
              <button className="dropdown-item" type="button" onClick={handleGrayscale}>
                Grayscale
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button" onClick={handleBlur}>
                Blur
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default DesktopHeader;

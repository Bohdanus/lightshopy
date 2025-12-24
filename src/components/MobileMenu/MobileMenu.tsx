import { useState, useEffect, useRef } from 'react';
import { Offcanvas } from 'bootstrap';

import './MobileMenu.scss';
import { useImage } from '../../contexts/ImageContext.tsx';
import { applyGrayscale } from '../../tools/grayscale.ts';
import { applyBlur } from '../../tools/blur.ts';

interface MobileMenuProps {
  onOpenClick: () => void;
  onSaveClick: () => void;
}

const MobileMenu = ({ onOpenClick, onSaveClick }: MobileMenuProps) => {
  const { image, setImage } = useImage();
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const bsOffcanvas = useRef<Offcanvas | null>(null);

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  useEffect(() => {
    if (offcanvasRef.current) {
      bsOffcanvas.current = new Offcanvas(offcanvasRef.current);

      const handleShow = () => setIsOpen(true);
      const handleHidden = () => setIsOpen(false);

      offcanvasRef.current.addEventListener('show.bs.offcanvas', handleShow);
      offcanvasRef.current.addEventListener('hidden.bs.offcanvas', handleHidden);

      return () => {
        offcanvasRef.current?.removeEventListener('show.bs.offcanvas', handleShow);
        offcanvasRef.current?.removeEventListener('hidden.bs.offcanvas', handleHidden);
      };
    }
  }, []);

  const toggleMenu = () => {
    bsOffcanvas.current?.toggle();
  };

  const handleGrayscale = async () => {
    const newImg = await applyGrayscale(image);
    setImage(newImg);
    bsOffcanvas.current?.hide();
  };

  const handleBlur = async () => {
    const newImg = await applyBlur(image);
    setImage(newImg);
    bsOffcanvas.current?.hide();
  };

  const handleOpenClick = () => {
    bsOffcanvas.current?.hide();
    onOpenClick();
  };

  const handleSaveClick = () => {
    bsOffcanvas.current?.hide();
    onSaveClick();
  };

  return (
    <>
      {!isOpen && (
        <button
          className="btn btn-dark floating-hamburger d-md-none"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
      )}

      <div
        className="offcanvas offcanvas-start mobile-menu-sidebar"
        tabIndex={-1}
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
        ref={offcanvasRef}
      >
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Logo
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="mobile-menu-container">
            <div className="accordion accordion-flush" id="menuAccordion">
              <div className="accordion-item bg-transparent">
                <h2 className="accordion-header" id="headingFile">
                  <button
                    className={`accordion-button ${openSection === 'file' ? '' : 'collapsed'}`}
                    style={{ background: '#eee', color: 'black' }}
                    type="button"
                    onClick={() => toggleSection('file')}
                    aria-controls="collapseFile"
                  >
                    File
                  </button>
                </h2>
                <div
                  id="collapseFile"
                  className={`accordion-collapse collapse ${openSection === 'file' ? 'show' : ''}`}
                  aria-labelledby="headingFile"
                  data-bs-parent="#menuAccordion"
                >
                  <div className="accordion-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-transparent border-0 ps-4">
                        <a className="text-decoration-none text-dark d-block w-100" href="#" onClick={handleOpenClick}>
                          Open
                        </a>
                      </li>
                      <li className="list-group-item bg-transparent border-0 ps-4">
                        <a className="text-decoration-none text-dark d-block w-100" href="#" onClick={handleSaveClick}>
                          Save
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item bg-transparent">
                <h2 className="accordion-header" id="headingEdit">
                  <button
                    className={`accordion-button ${openSection === 'edit' ? '' : 'collapsed'}`}
                    type="button"
                    style={{ background: '#eee', color: 'black' }}
                    onClick={() => toggleSection('edit')}
                    aria-controls="collapseEdit"
                  >
                    Edit
                  </button>
                </h2>
                <div
                  id="collapseEdit"
                  className={`accordion-collapse collapse ${openSection === 'edit' ? 'show' : ''}`}
                  aria-labelledby="headingEdit"
                  data-bs-parent="#menuAccordion"
                >
                  <div className="accordion-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-transparent border-0 ps-4">
                        <a className="text-decoration-none text-dark d-block w-100" href="#" onClick={handleGrayscale}>
                          Grayscale
                        </a>
                      </li>
                      <li className="list-group-item bg-transparent border-0 ps-4">
                        <a className="text-decoration-none text-dark d-block w-100" href="#" onClick={handleBlur}>
                          Blur
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="px-3 d-none">
            <h6>Left Tools</h6>
            <ul className="nav flex-column mb-4">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleGrayscale}>
                  To Grayscale
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleBlur}>
                  Blur
                </a>
              </li>
            </ul>
            <h6>Right Tools</h6>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Property 1
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Property 2
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

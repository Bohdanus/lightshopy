import { useState, useEffect, useRef } from 'react';
import { Offcanvas } from 'bootstrap';

import './MobileMenu.scss';
import AppMenu from '../AppMenu/AppMenu';


const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const offcanvasRef = useRef<HTMLDivElement>(null);
    const bsOffcanvas = useRef<Offcanvas | null>(null);

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

    return (
        <>
            {!isOpen && (
                <button
                    className="btn btn-dark floating-hamburger d-md-none"
                    type="button"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
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
                    <h5 className="offcanvas-title" id="mobileSidebarLabel">Photo App</h5>
                    <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0">
                    <div className="mobile-menu-container">
                        <AppMenu isMobile={true} />
                    </div>
                    <hr />
                    <div className="px-3">
                        <h6>Left Tools</h6>
                        <ul className="nav flex-column mb-4">
                            <li className="nav-item"><a className="nav-link" href="#">Tool 1</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Tool 2</a></li>
                        </ul>
                        <h6>Right Tools</h6>
                        <ul className="nav flex-column">
                            <li className="nav-item"><a className="nav-link" href="#">Property 1</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Property 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
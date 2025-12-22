import './Menu.scss';
import DesktopHeader from "../DesktopHeader/DesktopHeader.tsx";
import MobileMenu from "../MobileMenu/MobileMenu.tsx";

interface MenuProps {
  onOpenClick: () => void;
  onSaveClick: () => void;
}

const Menu = ({ onOpenClick, onSaveClick }: MenuProps) => {
  return (
    <>
      <DesktopHeader onOpenClick={onOpenClick} onSaveClick={onSaveClick} />
      <MobileMenu onOpenClick={onOpenClick} onSaveClick={onSaveClick} />
    </>
  );
};

export default Menu;

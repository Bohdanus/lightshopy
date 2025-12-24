import { useImage } from '../../contexts/ImageContext.tsx';
import { applyGrayscale } from '../../tools/grayscale.ts';
import { applyBlur } from '../../tools/blur.ts';
import './Sidebar.scss';

const SidebarLeft = () => {
  const { image, setImage } = useImage();

  const handleGrayscale = async () => {
    const newImg = await applyGrayscale(image);
    setImage(newImg);
  };

  const handleBlur = async () => {
    const newImg = await applyBlur(image);
    setImage(newImg);
  };

  return (
    <aside className="sidebar sidebar-left d-none d-md-block">
      <div className="p-3">
        <h5>Toolbox</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="nav-link" onClick={handleGrayscale}>
              Grayscale
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={handleBlur}>
              Blur
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarLeft;

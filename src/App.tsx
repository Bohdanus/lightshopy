import { useContext } from 'react';
import './App.scss';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';
import SidebarRight from './components/SidebarRight/SidebarRight';
import BottomToolbar from './components/BottomToolbar/BottomToolbar';
import Main from './components/Main/Main.tsx';
import { ImageContext } from './contexts/ImageContext';
import { ImageProvider } from './contexts/ImageProvider';

function AppContent() {
  const { openLoadImageDialog } = useContext(ImageContext);

  return (
    <div className="app-container">
      <Menu />
      <SidebarLeft />

      <Main onOpenClick={openLoadImageDialog} />

      <SidebarRight />
      <Footer />
      <BottomToolbar />
    </div>
  );
}

function App() {
  return (
    <ImageProvider>
      <AppContent />
    </ImageProvider>
  );
}

export default App;

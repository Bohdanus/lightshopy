
import { useState } from 'react';
import './App.scss';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';
import SidebarRight from './components/SidebarRight/SidebarRight';
import BottomToolbar from './components/BottomToolbar/BottomToolbar';
import Main from "./components/Main/Main.tsx";
import { ImageProvider, useImage } from './contexts/ImageContext';
import SaveDialog from './components/SaveDialog/SaveDialog';
import { saveImage } from './tools/save';

function AppContent() {
  const { image, loadImageFromDisk } = useImage();
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveClick = () => {
    if (image) {
      setShowSaveDialog(true);
    } else {
      alert('No image to save!');
    }
  };

  const handleSave = (filename: string, format: string) => {
    if (image) {
      saveImage(image, filename, format);
    }
  };

  return (
    <div className="app-container">
      <Menu onOpenClick={loadImageFromDisk} onSaveClick={handleSaveClick} />
      <SidebarLeft />

      <Main onOpenClick={loadImageFromDisk} />

      <SidebarRight />
      <Footer />
      <BottomToolbar />

      <SaveDialog
        show={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSave}
      />
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

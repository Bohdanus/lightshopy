
import './App.scss';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';
import SidebarRight from './components/SidebarRight/SidebarRight';
import BottomToolbar from './components/BottomToolbar/BottomToolbar';
import Main from "./components/Main/Main.tsx";
import { ImageProvider } from './contexts/ImageContext';

function App() {
  return (
    <ImageProvider>
      <div className="app-container">
        <Menu />
        <SidebarLeft />

        <Main />

        <SidebarRight />
        <Footer />
        <BottomToolbar />
      </div>
    </ImageProvider>
  );
}

export default App;

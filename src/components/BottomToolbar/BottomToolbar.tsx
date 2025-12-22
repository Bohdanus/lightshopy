import './BottomToolbar.scss';

const BottomToolbar = () => {
  return (
    <div className="bottom-toolbar d-md-none">
      <button className="btn btn-link nav-link">Home</button>
      <button className="btn btn-link nav-link">Tools</button>
      <button className="btn btn-link nav-link">Settings</button>
    </div>
  );
};

export default BottomToolbar;

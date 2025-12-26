import './BottomToolbar.scss';

const BottomToolbar = () => {
  return (
    <div className="bottom-toolbar d-md-none">
      <button className="btn btn-link nav-link">Todo</button>
      <button className="btn btn-link nav-link">Mobile</button>
      <button className="btn btn-link nav-link">Toolbar</button>
    </div>
  );
};

export default BottomToolbar;

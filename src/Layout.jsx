import { Outlet } from 'react-router-dom';
import './layout.css'; // Add landing specific CSS here

function Layout() {
  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="container app-container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

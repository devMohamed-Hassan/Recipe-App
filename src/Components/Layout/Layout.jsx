import React from 'react';
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Layout() {
  return (
    <div className="flex bg-[#F4F2EE] min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 ms-64">
        <main className="flex-grow px-3 py-4 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

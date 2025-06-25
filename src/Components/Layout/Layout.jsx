import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-[#F4F2EE] min-h-screen">
      {isSidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onClick={toggleSidebar}
          onKeyDown={(e) => e.key === 'Enter' && toggleSidebar()}
          className="fixed inset-0 bg-[rgba(0,0,0,0.70)] z-40 lg:hidden cursor-pointer"

        ></div>
      )}
      <div className={`fixed top-0 left-0 bottom-0 z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
        <SideBar onClose={toggleSidebar} />
      </div>
      <div className="flex flex-col flex-1 lg:ml-64 w-full">
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-xl text-orange-400"></i>
            </button>

            <h1 className="text-xl font-bold text-orange-500 font-cursive">Recipe</h1>
            <div className="w-10"></div>
          </div>
        </header>
        <main className="flex-grow px-3 py-4 lg:px-2 lg:py-6  overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

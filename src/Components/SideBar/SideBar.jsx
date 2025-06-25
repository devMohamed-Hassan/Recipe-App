import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

function SideBar({ onClose }) {
  const menuItems = [
    { to: '/', icon: 'fa-solid fa-utensils', text: 'Meals' },
    { to: '/ingredients', icon: 'fa-pepper-hot', text: 'Ingredients' },
    { to: '/area', icon: 'fa-earth-americas', text: 'Area' },
  ];

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-[#F9FAFB] h-full w-64 overflow-y-auto shadow-md">
      <div className="lg:hidden flex justify-end p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <i className="fas fa-times text-xl text-gray-700"></i>
        </button>
      </div>

      <div className="p-4 border-b border-gray-200">
        <img src={logo} alt="Recipe" className="w-full object-contain" />
      </div>
      <nav className="px-4 py-6">
        <ul className="space-y-4 font-medium font-cursive">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} onClick={handleNavClick}>
                {({ isActive }) => (
                  <div
                    className={`
                      px-4 py-2 rounded-xl text-lg font-semibold transition-all
                       hover:shadow-xl hover:shadow-orange-50
                      flex items-center
                      ${isActive
                        ? 'bg-[#F29724] text-white shadow-lg shadow-orange-300'
                        : 'bg-white text-black border border-red-200 hover:bg-gray-100'}
                    `}
                  >
                    <i className={`fas ${item.icon} me-2`}></i>
                    {item.text}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-BfNap0Pe.png';

function SideBar() {
  const menuItems = [
    { to: '/', icon: 'fa-solid fa-utensils', text: 'Meals' },
    { to: '/ingredients', icon: 'fa-pepper-hot', text: 'Ingredients' },
    { to: '/area', icon: 'fa-earth-americas', text: 'Area' },
  ];
  return (
    <div className="bg-[#F9FAFB] fixed top-0 left-0 bottom-0 w-64 overflow-y-auto shadow-md">
      <div className="p-4 border-b border-gray-200">
        <img src={logo} alt="Recipe" className="w-full object-contain" />
      </div>
      <nav className="px-4 py-6">
        <ul className="space-y-4 font-medium font-cursive">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to}>
                {({ isActive }) => (
                  <div
                    className={`
                      px-4 py-2 rounded-xl text-lg font-semibold transition-all
                      hover:scale-105 hover:shadow-xl hover:shadow-orange-50
                      flex items-center
                      ${isActive
                        ? 'bg-[#F29724] text-white shadow-lg shadow-orange-300'
                        : 'bg-white text-black border border-red-200'}
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

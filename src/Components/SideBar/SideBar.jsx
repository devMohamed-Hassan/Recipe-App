import React from 'react'
import styles from './SideBar.module.css'
import logo from '../../assets/logo-BfNap0Pe.png'
import { NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <>
      <div className="bg-[#F9FAFB] fixed top-0 bottom-0 left-0 w-[250px]">
        <img src={logo} alt="Recipe"
          className="w-full"
        />
        <ul className="px-2">
          <li className="text-center mb-2">
            <NavLink to={"/"} className=" block border-[1px] border-red-500 rounded-2xl py-2"><i className="fa-solid fa-utensils me-2"></i>Meals</NavLink>
          </li>
          <li className="text-center mb-2">
            <NavLink to={"/ingredients"} className=" block border-[1px] border-red-500 rounded-2xl py-2"><i className="fa-solid fa-utensils me-2"></i>Ingredients</NavLink>
          </li>
          <li className="text-center mb-2">
            <NavLink to={"/area"} className=" block border-[1px] border-red-500 rounded-2xl py-2"><i className="fa-solid fa-utensils me-2"></i>Area </NavLink>
          </li>
        </ul>
      </div>
    </>

  )
}

export default SideBar
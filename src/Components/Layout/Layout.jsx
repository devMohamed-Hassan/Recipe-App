import React from 'react'
import styles from './Layout.module.css'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Layout() {
  return (
    <>
      <SideBar />
      <div className="bg-[#F4F2EE] ms-[250px]">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Layout
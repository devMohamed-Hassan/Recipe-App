import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 lg:py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-left ">
            <h3 className="text-lg lg:text-2xl font-semibold  mb-2 bg-gradient-to-r from-[#F29624] to-[#DE6241] bg-clip-text text-transparent font-cursive">
              Footer
            </h3>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
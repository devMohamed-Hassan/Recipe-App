import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-md mx-auto">
          <div className="text-6xl lg:text-8xl mb-6 text-[#F29724]">
            <i className="fas fa-utensils"></i>
          </div>
          <h1 className="text-4xl lg:text-6xl font-pacifico font-bold mb-4 bg-gradient-to-r from-[#F29624] to-[#DE6241] bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-emerald-600 font-cursive">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-sm lg:text-base mb-8 font-cursive bg-gray-50">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, et.
          </p>
          <Link
            to="/"
           className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold px-6 py-3 rounded-full hover:from-green-500 hover:to-emerald-600 hover:shadow-lg transition-all duration-300"
          >
            <i className="fas fa-home mr-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
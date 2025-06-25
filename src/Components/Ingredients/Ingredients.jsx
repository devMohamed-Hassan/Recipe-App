import React from 'react'
import styles from './Ingredients.module.css'

function Ingredients() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-md mx-auto">
          <div className="text-6xl lg:text-8xl mb-6 text-[#F29724]">
            <i className='fas fa-pepper-hot'></i>
          </div>
          <h1 className="text-2xl lg:text-3xl font-cursive font-bold mb-4 bg-gradient-to-r from-[#F29624] to-[#DE6241] bg-clip-text text-transparent">
            Ingredients Component
          </h1>
          
          <div className="bg-gray-50 rounded-lg p-4">
           <p className="text-xl text-gray-500 ">
             😴🥱مكسل اعمله
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ingredients
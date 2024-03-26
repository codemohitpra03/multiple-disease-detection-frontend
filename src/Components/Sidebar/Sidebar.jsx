import React from 'react'

import heart from '../../assets/heart.png'
import diabetes from '../../assets/diabetes.png'
import parkinson from '../../assets/parkinson.png'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({setter}) => {
  const [disease, setDisease] = useState(( window.location.pathname === '/heart' ? 0 : (window.location.pathname === '/diabetes' ? 1 : 0)))
  return (
    <div className='h-[100vh] bg-[#4d1473f0] p-10 flex-col flex items-center justify-between space-y-9'>

      <div className='space-y-12'>
        <div className='flex items-center space-x-3'>
          <img className='w-16' src={logo} alt="" />
          <p className='text-white font-bold text-2xl'>Multiple Disease Detection</p>
        </div>


        <div className='space-y-2'>

          <Link to='/heart' onClick={()=>{
            setDisease(0)
            setter(false)
          }} className={`flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-[#a853e0] hover:rounded-md hover:text-gray-400 ${window.location.pathname === '/heart' ? "bg-[#a853e0] text-gray-400 rounded-md" :""}`}>
            <img width={40} src={heart} alt="" />
            <p className='text-white font-semibold text-xl'>Heart</p>
          </Link>
          <Link to='/diabetes' onClick={()=>{
            setDisease(1)
            setter(false)
          }} className={`flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-[#a853e0] hover:rounded-md hover:text-gray-400 ${ window.location.pathname === '/diabetes' ? "bg-[#a853e0] text-gray-400 rounded-md" :""}`}>
            <span>
              <img width={40} src={diabetes} alt="" />
            </span>
            <p className='text-white font-semibold text-xl'>Diabetes</p>
          </Link>
          <Link to='/parkinson' onClick={()=>{
            setDisease(3)
            setter(false)
          }} className={`flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-[#a853e0] hover:rounded-md hover:text-gray-400 ${ window.location.pathname === '/parkinson' ? "bg-[#a853e0] text-gray-400 rounded-md" :""}`}>
            <span>
              <img width={40} src={parkinson} alt="" />
            </span>
            <p className='text-white font-semibold text-xl'>Parkinson's</p>
          </Link>
        </div>
      </div>



      <div className=''>
        <p className='text-white'>Developed by - </p>
        <a className='text-purple-100 font-bold' href='https://github.com/codemohitpra03' target='_blank'>@codemohitpra03🧑‍💻</a>
      </div>
    </div>
  )
}

export default Sidebar
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Welcome from '../Welcome/Welcome'
import { Outlet } from 'react-router-dom'

import { useState } from 'react';
const Home = () => {
  
  const [isHome, setIsHome] = useState(window.location.pathname === '/')
  
  return (
    <div className="grid grid-cols-[250px_1fr]">
      	<Sidebar setter = {setIsHome}/>
      	
        <div style={{display:`${isHome ? "block" : "none"}`}}>
          <Welcome/>
        </div>
        <div style={{display:`${isHome ? "none" : "block"}`}}>
          <Outlet/>
        </div>
    </div>
  )
}

export default Home
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className="grid grid-cols-[250px_1fr]">
      	<Sidebar/>
      	<Outlet />
    </div>
  )
}

export default Home
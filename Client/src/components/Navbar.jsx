import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-semibold text-gray-800">
        Candidate Evaluation System
      </h1>

      <div className="flex gap-6 text-gray-600">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-600 ${
              isActive
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : ''
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            `hover:text-blue-600 ${
              isActive
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : ''
            }`
          }
        >
          Candidates
        </NavLink>

      </div>
    </div>
  )
}

export default Navbar
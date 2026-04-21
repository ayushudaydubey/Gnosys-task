import React from 'react'
import { Link } from 'react-router-dom'

const CandidateTable = ({ candidates }) => {
  return (
    <div className="space-y-4">
      
      
      {!candidates?.length && (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No candidates found
        </div>
      )}

      {candidates?.map((c) => (
        <div
          key={c._id || c.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md hover:border-gray-200 transition"
        >
          
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-800">
              {c.name}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Email:</span> {c.email}
            </p>

            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Phone:</span> {c.phone}
            </p>
          </div>

    
          <div className="flex justify-end">
            <Link
              to={`/candidates/${c._id || c.id}`}
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}

    </div>
  )
}

export default CandidateTable
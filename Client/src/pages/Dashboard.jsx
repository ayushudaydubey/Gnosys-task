import React, { useState, useEffect } from 'react'
import useDashboard from '../hooks/useDashboard'
import StatusBadge from '../components/coman/StatusBadge'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Loader from '../components/coman/Loader'


const Dashboard = () => {
  const { data, isLoading } = useDashboard()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const filteredData = data?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const total = filteredData?.length || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  useEffect(() => {
    const filtered = data?.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    const totalLocal = filtered?.length || 0
    const totalPagesLocal = Math.max(1, Math.ceil(totalLocal / pageSize))

    if (page > totalPagesLocal) setPage(totalPagesLocal)
    
  }, [data, search, pageSize, page])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    )
  }

  const start = (page - 1) * pageSize
  const paginated = filteredData?.slice(start, start + pageSize) || []

  return (
    <div className="min-h-screen bg-gray-100">
      
   
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">

     
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Candidates
          </h2>

          <Link
            to="/candidates"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Candidate
          </Link>
        </div>

      
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4">Name</th>
                <th>Stage</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((c) => (
                <tr
                  key={c._id || c.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">{c.name}</td>
                  <td>{c.stage}</td>
               <td>{c.score?.toFixed(2)}</td>                  <td>
                    <StatusBadge status={c.status || c.stage} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        
          {paginated.length === 0 && (
            <p className="text-center py-6 text-gray-500">No candidates found</p>
          )}
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <label className="text-sm text-gray-600 mr-2">Rows:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPage(1)
              }}
              className="border rounded-lg p-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              First
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
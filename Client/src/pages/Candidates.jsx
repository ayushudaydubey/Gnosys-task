import React, { useState } from 'react'
import useCandidates from '../hooks/useCandidates'
import CandidateForm from '../components/candidate/CandidateForm'
import CandidateTable from '../components/candidate/CandidateTable'
import Navbar from '../components/Navbar'
import Loader from '../components/coman/Loader'


const Candidates = () => {
  const { data, isLoading } = useCandidates()

  const [page, setPage] = useState(1)
  const limit = 5

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
       <Loader/>
      </div>
    )
  }

  const totalPages = Math.ceil(data.length / limit)
  const start = (page - 1) * limit
  const paginatedData = data.slice(start, start + limit)

  return (
  <div className="h-screen flex flex-col bg-gray-100">


  <div className="sticky top-0 z-50 bg-white shadow">
    <Navbar />
  </div>

  <div className="flex flex-1 overflow-hidden">

 
    <div className="hidden lg:block w-[350px] border-r bg-white p-4 overflow-y-auto">
      <div className="sticky top-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add Candidate
        </h2>
        <CandidateForm />
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">

    
      <div className="lg:hidden bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add Candidate
        </h2>
        <CandidateForm />
      </div>

      <h1 className="text-xl font-semibold text-gray-800">
        Candidate Management
      </h1>

      <CandidateTable candidates={paginatedData} />

  
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1 text-gray-600">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  </div>
</div>
  )
}

export default Candidates
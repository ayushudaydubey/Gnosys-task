import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loader from '../components/coman/Loader'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Candidates = lazy(() => import('../pages/Candidates'))
const CandidateDetails = lazy(() => import('../pages/CandidateDetails'))

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/:id" element={<CandidateDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useCandidateDetails from '../hooks/useCandidateDetails'
import { updateScreening, submitRound } from '../api/candidateApi'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import StatusBadge from '../components/coman/StatusBadge'
import Loader from '../components/coman/Loader'


const CandidateDetails = () => {
  const { id } = useParams()
  const { data, isLoading } = useCandidateDetails(id)
  const qc = useQueryClient()

  const [status, setStatus] = useState('')
  const [remarks, setRemarks] = useState('')

  const screeningMut = useMutation(
    ({ candidateId, body }) => updateScreening(candidateId, body),
    {
      onSuccess: () => {
        qc.invalidateQueries(['candidate', id])
        toast.success('Screening updated')
      },
      onError: (err) => toast.error(err?.message || 'Update failed')
    }
  )

  const roundMut = useMutation((body) => submitRound(body), {
    onSuccess: () => {
      qc.invalidateQueries(['candidate', id])
      toast.success('Round submitted')
    },
    onError: (err) => toast.error(err?.message || 'Submit failed')
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
         <Loader/>
      </div>
    )
  }

  const candidate = data.candidate
  const screening = data.screening
  const rounds = data.rounds || []
  const evaluation = data.evaluation || null

  const submitScreening = () => {
    if (!status) return toast.warning('Select status')

    screeningMut.mutate({
      candidateId: candidate._id,
      body: { status, remarks }
    })
  }

  const submitNewRound = (e) => {
    e.preventDefault()
    const form = e.target

    const type = form.type.value.trim()
    const feedback = form.feedback.value.trim()
    const rating = form.rating.value
    const aiScore = form.aiScore.value

    if (!type || !feedback) {
      return toast.warning('Please fill all required fields')
    }

    if (rating && (rating < 1 || rating > 10)) {
      return toast.warning('Rating must be between 1 and 10')
    }

    if (aiScore && (aiScore < 0 || aiScore > 10)) {
      return toast.warning('AI Score must be between 0 and 10')
    }

    const body = {
      candidateId: candidate._id,
      type,
      feedback,
      rating: rating ? Number(rating) : undefined,
      aiScore: aiScore ? Number(aiScore) : undefined
    }

    roundMut.mutate(body)
    form.reset()
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{candidate.name}</h1>
            <p className="text-gray-500">{candidate.email}</p>
            <p className="text-gray-500">{candidate.phone}</p>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-right">
              {evaluation && evaluation.finalScore != null ? (
                <>
                  <div className="text-sm text-gray-500">Final Score</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {Number(evaluation.finalScore).toFixed(2)}
                  </div>
                  <div className="mt-2">
                    <StatusBadge status={evaluation.status || 'Pending'} />
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-600">
                  Not evaluated yet
                  <div className="mt-2">
                    <StatusBadge status={'Not evaluated'} />
                  </div>
                </div>
              )}
            </div>

            <a
              href={candidate.resume}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              View Resume
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-2 border-gray-500 rounded-xl" >

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Screening
            </h2>

            <div className="mb-4">
              <span className="text-sm text-gray-500">Current Status</span>
              <div className="mt-1 inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                {screening?.status || 'Pending'}
              </div>
            </div>

            <div className="space-y-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select status</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>

              <input
                placeholder="Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                onClick={submitScreening}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Update Screening
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add Interview Round
            </h2>

            <form onSubmit={submitNewRound} className="space-y-3">
              <select
                name="type"
                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select type</option>
                <option>HR</option>
                <option>Technical</option>
                <option>Task</option>
              </select>

              <textarea
                name="feedback"
                placeholder="Enter feedback"
                rows={3}
                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              <input
                name="rating"
                type="number"
                placeholder="Rating (1-10)"
                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                name="aiScore"
                type="number"
                placeholder="AI Score"
                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                disabled={roundMut.isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {roundMut.isLoading ? 'Submitting...' : 'Submit Round'}
              </button>
            </form>
          </div>
        </div>

 <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">
    Interview Rounds
  </h2>

  {rounds.length === 0 && (
    <p className="text-gray-500">No rounds available</p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {rounds.map((r) => (
      <div
        key={r._id}
        className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition flex flex-col"
      >
        <p className="font-semibold text-gray-800 mb-2">{r.type}</p>

        <textarea
          value={r.feedback}
          readOnly
          rows={3}
          className="w-full bg-white rounded-lg p-2 text-gray-700 resize-none text-sm"
        />

        <div className="flex justify-between mt-3 text-xs text-gray-600">
          <span>Rating: {r.rating ?? 'N/A'}</span>
          <span>AI Score: {r.aiScore ?? 'N/A'}</span>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </>
  )
}

export default CandidateDetails
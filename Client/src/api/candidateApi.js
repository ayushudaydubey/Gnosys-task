import API from './axios'

export const getCandidates = async () => {
  const res = await API.get('/candidates')
  return res.data.data
}

export const getCandidateDetails = async (id) => {
  const res = await API.get(`/candidates/${id}`)
  return res.data
}

export const addCandidate = async (data) => {
  const res = await API.post('/candidates', data)
  return res.data
}

export const updateScreening = async (candidateId, body) => {
  const res = await API.patch(`/screening/${candidateId}`, body)
  return res.data
}

export const submitRound = async (body) => {
  const res = await API.post('/rounds', body)
  return res.data
}

export const getDashboard = async () => {
  const res = await API.get('/dashboard')
  return res.data.data
}
import { useQuery } from '@tanstack/react-query'
import { getCandidateDetails } from '../api/candidateApi'

const useCandidateDetails = (id) => {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: () => getCandidateDetails(id)
  })
}

export default useCandidateDetails
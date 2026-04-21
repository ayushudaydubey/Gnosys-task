import { useQuery } from '@tanstack/react-query'
import { getCandidates } from '../api/candidateApi'

const useCandidates = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: getCandidates
  })
}

export default useCandidates
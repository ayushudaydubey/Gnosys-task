import React, { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCandidate } from '../../api/candidateApi'
import { toast } from 'react-toastify'

const CandidateForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [file, setFile] = useState(null)

  const fileRef = useRef(null)

  const qc = useQueryClient()

  const mutation = useMutation(addCandidate, {
    onSuccess: () => {
      qc.invalidateQueries(['candidates'])
      qc.invalidateQueries(['dashboard'])

      setName('')
      setEmail('')
      setPhone('')
      setFile(null)

   
      if (fileRef.current) {
        fileRef.current.value = ''
      }

      toast.success('Candidate added successfully')
    },

    onError: (err) => {
      const backendErrors = err?.response?.data?.errors

      if (Array.isArray(backendErrors)) {
        backendErrors.forEach((error) => {
          toast.error(error.msg)
        })
      } else {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          'Add failed'

        toast.error(msg)
      }
    }
  })

  const submit = (e) => {
    e.preventDefault()

    if (!name || !email || !phone || !file) {
      toast.warning('All fields required')
      return
    }

    const fd = new FormData()
    fd.append('name', name)
    fd.append('email', email)
    fd.append('phone', phone)
    fd.append('resume', file)

    mutation.mutate(fd)
  }

  return (
    <form onSubmit={submit} className="space-y-3">

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-2 w-full"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-lg p-2 w-full"
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border rounded-lg p-2 w-full"
      />

      <input
        type="file"
        ref={fileRef}
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm"
      />

      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {mutation.isLoading ? 'Adding...' : 'Add'}
      </button>

    </form>
  )
}

export default CandidateForm
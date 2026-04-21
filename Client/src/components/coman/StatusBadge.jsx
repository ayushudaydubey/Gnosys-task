import React from 'react'

const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase()
  const cls = s.includes('short')
    ? 'bg-green-100 text-green-800 px-2 py-1 rounded'
    : s.includes('reject')
    ? 'bg-red-100 text-red-800 px-2 py-1 rounded'
    : 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded'

  return <span className={cls}>{status}</span>
}

export default StatusBadge
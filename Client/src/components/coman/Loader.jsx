import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[70vh] bg-gray-50">
      
      <div className="flex flex-col items-center gap-4">

     
        <div className="relative w-16 h-16">
          
          <div className="absolute inset-0 rounded-full border-4 border-zinc-400"></div>

          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>

        </div>

   
        <p className="text-xl text-gray-700 tracking-wide">
          Please wait...
        </p>

      </div>

    </div>
  )
}

export default Loader
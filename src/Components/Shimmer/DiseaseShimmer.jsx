import React from 'react'

const DiseaseShimmer = () => {
  return (
    <div className='h-screen w-[calc(100vw-250px)] p-16'>

        <div className='flex justify-between'>
            <div className='w-32 h-8 bg-gray-200 animate-pulse'></div>
            <div className='w-32 h-8 bg-gray-200 animate-pulse'></div>
        </div>

        <div className='flex flex-wrap my-10'>
            <div className='space-y-3 m-5'>
                <div className='w-16 h-5 bg-gray-200 animate-pulse'></div>
                <div className='w-[200px] h-10 bg-gray-200 animate-pulse'></div>
            </div>
            <div className='space-y-3 m-5'>
                <div className='w-16 h-5 bg-gray-200 animate-pulse'></div>
                <div className='w-[200px] h-10 bg-gray-200 animate-pulse'></div>
            </div>
            <div className='space-y-3 m-5'>
                <div className='w-16 h-5 bg-gray-200 animate-pulse'></div>
                <div className='w-[200px] h-10 bg-gray-200 animate-pulse'></div>
            </div>
            <div className='space-y-3 m-5'>
                <div className='w-16 h-5 bg-gray-200 animate-pulse'></div>
                <div className='w-[200px] h-10 bg-gray-200 animate-pulse'></div>
            </div>
            <div className='space-y-3 m-5'>
                <div className='w-16 h-5 bg-gray-200 animate-pulse'></div>
                <div className='w-[200px] h-10 bg-gray-200 animate-pulse'></div>
            </div>
            <div className='space-y-3 m-5'>
                <div className='w-16 h-5 bg-gray-200 animate-pulse'></div>
                <div className='w-[200px] h-10 bg-gray-200 animate-pulse'></div>
            </div>
        </div>

        <div className='w-[100px] h-[50px] bg-gray-200 animate-pulse'></div>


    </div>
  )
}

export default DiseaseShimmer
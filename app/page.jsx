import React from 'react'
import '@/styles/globals.css'
import Image from '@node_modules/next/image'

const Home = () => {
  return (
    <section className="bg-richblack-900 text-pink-400 text-3xl w-[100vw] h-[100vh]">
      Hello , Welcome to the Hostel Management App
      <div className='flex justify-center items-center h-full'>
        <Image src='/assets/images/logo.png' width='200' height='200' className='animate-rotateY'/>
      </div>
    </section>  
  )
}

export default Home

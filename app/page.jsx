'use client'
import React from 'react'
import '@/styles/globals.css'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {
  return (
    <section className="bg-richblack-900 w-[100vw] h-[100vh]">
      <div className='flex justify-center items-center h-full'>
        <Image src='/assets/images/logo.png' width='200' height='200' className='animate-rotateY'/>
      </div>
    </section>  
  )
}

export default Home

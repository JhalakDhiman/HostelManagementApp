import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-[100vw] h-[100vh] justify-cetext-3xl flex flex-col items-center pt-4 bg-richblack-900'>
      <h1 className='text-center text-richblack-5 text-2xl'>Welcome Student</h1>
      <p className='text-richblack-400'>Let us start today's work </p>
      <div>
        {/* Dashboard content goes here */}
        <p className='text-richblack-400'>This is your dashboard where you can manage your activities.</p>
        <div className='flex gap-4 mt-4'>
            <div>
                <Link href="/student/student-attendance"><Button>View Attendance</Button></Link>
            </div>
            <div>
                <Link href="/student/student-hostel-attendance"><Button>Attendance Control Block</Button></Link>
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default Dashboard

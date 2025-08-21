import React from 'react'
import login from '@public/assets/images/login.webp'
import '@/styles/globals.css'
import StudentLoginTemplate from '@components/auth/StudentLoginTemplate'

const StudentLogin = () => {
  return (
    <div className="w-full bg-richblack-900">
      <StudentLoginTemplate
        heading="Welcome"
        description1=""
        description2=""
        image={login}
      />
    </div>
  )
}

export default StudentLogin

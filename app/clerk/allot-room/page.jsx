import React from 'react'
import Template from '@/components/auth/Template'

const Signup = () => {
  return (
    <div className="w-full min-h-[100vh]">
      <Template 
        heading = 'Room Allotment Form'
        description1 = ''
        description2 = ''
        formType="signup"
        ></Template>
    </div>
  )
}

export default Signup

import React from 'react'
import Template from '@components/auth/Template'

const OfficialLogin = () => {
  return (
    <div className="w-full h-full">
      <Template 
        heading = 'Welcome'
        description1 = ''
        description2 = ''
        formType="officialLogin"
        ></Template>
    </div>
  )
}

export default OfficialLogin

'use client'
import React from 'react'
import SignupForm from './SignupForm';
import OfficialLoginForm from './OfficialLoginForm'
import Image from 'next/image';

const Template = ({heading,description1,description2,formType}) => {

  return (
    <div className="flex lg:flex-row h-full md:flex-row flex-col max-w-[1160px] w-11/12 py-12 mx-auto gap-x-10 justify-between gap-y-0">

       {/* left container */}

       <div className="lg:w-[40%] w-full">
            <div>
             <h2 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">{heading}</h2>
            </div>

            <div className="text-[1.125rem] leading-[1.625rem] mt-4">
                <p className="text-blue-100">{description1}</p>
                <p className="text-blue-300 italic">{description2}</p>
            </div>

        
                {
                    formType==="signup"?
                    (<SignupForm/>):
                    (<OfficialLoginForm/>)
                }
       </div>

       {/* right container */}

       <div className="relative invisible md:visible lg:visible lg:w-[40%] w-full">
        <Image src='/assets/images/hostelImage.jpg' alt='some' width={558} height={490} className="absolute -top-4  right-4"></Image>
        <Image src='/assets/images/frame.png' alt='some' width={558} height={504} ></Image>
       </div>



      
    </div>
  )
}

export default Template


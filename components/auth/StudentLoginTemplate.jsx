import React from 'react'
import StudentLoginForm from './StudentLoginForm';
import {FcGoogle} from 'react-icons/fc';
import Image from 'next/image';

const StudentLoginTemplate = ({heading,description1,description2}) => {

  return (
    <div className="flex lg:flex-row md:flex-row flex-col max-w-[1160px] w-11/12 py-12 mx-auto gap-x-10 justify-between gap-y-0">

       {/* left container */}

       <div className="lg:w-[40%] w-full">
            <div>
             <h2 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">{heading}</h2>
            </div>

            <div className="text-[1.125rem] leading-[1.625rem] mt-4">
                <p className="text-blue-100">{description1}</p>
                <p className="text-blue-300 italic">{description2}</p>
            </div>

        
               <StudentLoginForm/>
            

            <div className="flex w-[91.7%] items-center my-4 gap-x-2">
                <div className="h-[1px] w-full bg-white opacity-30 "></div>
                <p className="text-white opacity-30 font-medium leading-[1.375rem]">OR</p>
                <div className="h-[1px] w-full bg-white opacity-30"></div>
            </div>

            <button className="flex w-[91.7%] justify-center items-center rounded-[8px] font-medium text-white opacity-50 border border-white px-[12px] py-[8px] gap-x-2 mt-6">
                <FcGoogle/>
                <p>Sign in with Google</p>
            </button>
       </div>

       {/* right container */}

       <div className="relative invisible md:visible lg:visible lg:w-[40%] w-full">
        <Image src='/assets/images/login.webp' width={558} height={490} className="absolute -top-4  right-4"/>
        <Image src='/assets/images/frame.png' width={558} height={504}/>
       </div>



      
    </div>
  )
}

export default StudentLoginTemplate


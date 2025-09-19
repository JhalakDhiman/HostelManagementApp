'use client'
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'
import Button from './Button';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';


const Navbar = () => {

  const { user } = useContext(AuthContext)

  return (
    <div className='w-full h-[60px] border-b-[1px] border-richblack-500 p-4 bg-richblack-900 text-richblack-25 font-semibold text-lg flex items-center justify-between pr-9'>
      <div className='flex items-center gap-3'>
        <Image src='/assets/images/logo.png' className='w-[40px] h-[40px]' alt='logo' width={150} height={40} />
        <div className='flex flex-col'>
          <p className='text-richblack-5 italic ml-2 font-semibold'>Inmate</p>
          <TypeAnimation
            sequence={[
              '"Your intelligent hostel mate for effortless management."', 1000, ""
            ]}
            style={{ disbulay: 'inline-block', fontSize: '16px', fontStyle: "italic" }}
            repeat={Infinity}
            omitDeletionAnimation={true}
            className='text-blue-200'
          />
        </div>
        

      </div>
      <div>
        {
          user ? <ProfileDropdown user={user}/> : 
          <div className='ml-4 flex gap-2'>
            <Link href='/student/student-login'>
              <Button text="Student Login" />
            </Link>
            <Link href='/officialLogin'>
              <Button text="Official Login" />
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar

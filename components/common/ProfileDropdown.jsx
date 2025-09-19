'use client'
import React, { useContext, useRef, useState } from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import Link from 'next/link'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ProfileDropdown = ({ user }) => {

  const [open, setOpen] = useState();
  const ref = useRef()
  const {setUser,setToken} = useContext(AuthContext)
  const router = useRouter();
  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    router.push('/');
  }

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div className='flex items-center'>
      <button className="relative cursor-pointer" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1">
          <Image
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            width={30}
            height={30}
            className="aspect-square w-[40px] rounded-full object-cover"
          />
          <AiOutlineCaretDown className="text-sm text-gray-400" />
        </div>
        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-gray-700 overflow-hidden rounded-md border-[1px] border-gray-700 bg-gray-800"
            ref={ref}
          >
            <Link href={`/${user?.accountType}/${user?.accountType}-dashboard`} onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-100 hover:bg-gray-700 hover:text-gray-25">
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>
            <div
              onClick={() => {
                logout()
                setOpen(false)
              }}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-100 hover:bg-gray-700 hover:text-gray-25"
            >
              <VscSignOut className="text-lg" />
              Logout
            </div>
          </div>
        )}
      </button>
    </div>
  )
}

export default ProfileDropdown

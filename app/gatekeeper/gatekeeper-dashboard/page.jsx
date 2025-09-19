'use client'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const GatekeeperDashboard = () => {

    const {user} = useContext(AuthContext)

    return (
        <div className='flex flex-col items-center min-h-screen p-4'>
            <h1 className='mt-3 text-richblack-5 font-semibold '>Welcome {user?.firstName} to your Dashboard</h1>
            <p className='text-richblack-300 italic'>This is your dashboard where you can access various features tailored to your needs.</p>
            <div className='flex gap-3 mt-4'>
                <Link href='/gatekeeper/absent-students'>
                    <Button>Absentees Info</Button>
                </Link>
            </div>
        </div>
    )
}

export default GatekeeperDashboard

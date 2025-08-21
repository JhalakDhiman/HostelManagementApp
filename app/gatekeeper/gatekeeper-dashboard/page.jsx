import Link from '@node_modules/next/link'
import React from 'react'

const GatekeeperDashboard = () => {

    return (
        <div className='flex justify-center items-center h-full'>
            <div>
                <h1>Get Information Of Absent Students : </h1>
                <Link href='/gatekeeper/absent-students'>
                    <button className='bg-yellow-50 text-richblack-900 p-2 rounded-lg '>
                        Fetch Info
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default GatekeeperDashboard

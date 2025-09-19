"use client";
import '@/styles/globals.css'
import React, { useContext, useState } from 'react'
import OTPInput from 'react-otp-input'
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCountdownTimer } from "react-icons/rx";
import { StudentLoginContext } from '@/context/StudentLoginData';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast'

const VerifyLoginOtp = () => {

    const [otp, setOtp] = useState('');
    const router = useRouter();

    const { studentLoginData } = useContext(StudentLoginContext);
    const { setUser, setToken } = useContext(AuthContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(otp);

        console.log(studentLoginData);

        const {
            email,
            password,
            hostelName
        } = studentLoginData;

        console.log(email, password);

        const response = await fetch('/api/auth/studentLogin', {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                hostelName,
                otp
            })
        })

        const data = await response.json();
        if(!data.success){
            toast.error(data.message);
            return;
        }
        toast.success(data.message);
        await setUser(data.user);
        await setToken(data.token);
        localStorage.setItem("token",JSON.stringify(data.token));
        localStorage.setItem("user",JSON.stringify(data.user));
        router.push('/student/student-dashboard')

    }

    return (
        <div className='flex justify-center items-center h-[70%]'>
            <div className="flex flex-col gap-3 w-4/12">
                <h1 className="text-richblack-5 text-3xl font-semibold">Verify Email</h1>
                <p className="text-richblack-100 text-[18px] w-[90%] font-semibold">A verification code has been sent to clerk of your Hostel. Enter the code below</p>
                <form onSubmit={submitHandler}>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) =>
                            <input {...props}
                                placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className='bg-richblack-900 w-[50px] m-1 h-[50px] rounded-lg border-[1px] border-richblack-600 text-richblack-5 text-center focus:border-0 focus:outline-yellow-300 ' />
                        }
                    />
                    <button type="submit"
                        className="w-[85%] bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                        Verify Email
                    </button>
                </form>
                <div className="mt-4  w-[85%]  flex justify-between">
                    <Link href='/student-login'>
                        <div className="flex gap-2 items-center">
                            <IoMdArrowRoundBack className="text-richblack-5" />
                            <p className="text-richblack-5">Back to Login</p>
                        </div>
                    </Link>
                    <button className="flex items-center gap-2">
                        <RxCountdownTimer className="text-blue-100 text-[20px]" />
                        <p className="text-blue-100 text-semibold">Resend it</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyLoginOtp

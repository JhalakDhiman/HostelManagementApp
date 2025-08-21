"use client";
import React, { useContext } from 'react'
import '@/styles/globals.css'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { hostelClerks } from '@data/hostelClerks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast'
import { StudentLoginContext } from '@context/StudentLoginData';


const StudentLoginForm = () => {

    const router = useRouter();
    const [showPassword, setPassword] = useState(false);
    const { setStudentLoginData } = useContext(StudentLoginContext);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const submitHandler = async (data) => {
        const { hostelName } = data;
        
        setStudentLoginData(data);
        localStorage.setItem("studentLoginData", JSON.stringify(data));
        const clerkEmail = hostelClerks[hostelName];

        console.log('clerk email : ', clerkEmail);

        const loading = toast.loading("loading...");
        const response = await fetch('/api/auth/sendOtp', {
            method: "POST",
            body: JSON.stringify({
                email:clerkEmail
            })
        })

        const data2 = await response.json();
        console.log(data2);

        toast.dismiss(loading);

        router.push('/student/verify-student-login-otp');
    }

    return (
        <div>

            <form onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col w-[92%] gap-y-4 mt-6">

                <label className="w-full">
                    <p className="text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60">Email Address<sup className="text-red-600">*</sup></p>
                    <input
                        className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        {...register("email", { required: true })}
                    ></input>
                    {
                        errors.email && <span>
                            email is required
                        </span>
                    }
                </label>

                <label className="w-full">
                    <p className="text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60">Hostel Name<sup className="text-red-600">*</sup></p>
                    <input
                        className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="text"
                        name="hostelName"
                        placeholder="Enter hostel name"
                        {...register("hostelName", { required: true })}
                    ></input>
                    {
                        errors.hostelName && <span>
                            hostelName is required
                        </span>
                    }
                </label>

                <label className="w-full relative">
                    <p className="text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60">Password<sup className="text-red-600">*</sup></p>
                    <input
                        className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        {...register("password", { required: true })}
                    ></input>
                    {
                        errors.password && <span>
                            password is required
                        </span>
                    }
                    <span
                        className="absolute right-3 top-[43px] cursor-pointer"
                        onClick={() => {
                            setPassword(!showPassword);
                        }}>
                        {
                            showPassword ?

                                <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf' />

                                : <AiOutlineEye fontSize={24} fill='#afb2bf' />
                        }
                    </span>
                </label>

                <div>
                    <Link href='/forgot-password'>
                        <p className="text-xs cursor-pointer -mt-3 max-w-max text-blue-300 ml-auto ">forgot password</p>
                    </Link>
                </div>

                <button type="submit"
                    className="bg-yellow-100 rounded-[8px] mt-7 font-medium text-[#000814] px-[12px] py-[8px] w-full">Sign In</button>


            </form>

        </div>
    )
}

export default StudentLoginForm;

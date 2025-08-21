// import 'use client';

import React, { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Tab from './Tab';
import { ACCOUNT_TYPE } from '@utils/constants';
import { AuthContext } from '@context/AuthContext';
import toast from 'react-hot-toast'

const SignupForm = () => {

    const { register,
        handleSubmit,
        formState: { isSubmitSuccessful, errors }
    } = useForm();

    const [showPassword, setPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const {user,token} = useContext(AuthContext);
    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const tabData = [
        {
          name:"Student",
          type:ACCOUNT_TYPE.STUDENT,
        }
      ]


    const router = useRouter();

    const submitHandler = async(data) => {

        console.log("in room allotment clerk data : ",user);
        console.log(data);

        const {
            email,
            password,
            firstName,
            lastName,
            confirmPassword,
            contactNumber,
            gender,
            roomNumber,
            fatherName,
            seatNumber,
            fatherContactNumber
         } = data;
         console.log(email,password,firstName,lastName,accountType,confirmPassword,seatNumber,contactNumber,gender,roomNumber,fatherContactNumber,fatherName)

         const hostelId = user?.hostel?._id;

         const res = await fetch('/api/hostel/allotRoom',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                confirmPassword,
                contactNumber,
                gender,
                accountType,
                roomNumber,
                fatherName,
                seatNumber,
                fatherContactNumber,
                hostelId
            })
         })
         const data2 = await res.json();
         if(!data2.success){
            toast.error(data2.message);
            return;
         }
         toast.success(data2.message);
         router.push('/clerk/clerk-dashboard')
    }

    return (
        <div className="w-11/12 h-full max-width-[450px]">

            <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType}></Tab>

            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex gap-x-4">
                    <div>
                        <label
                            className="w-full  text-[0.875rem] leading-[1.375rem] text-white opacity-60" htmlFor='firstName'>First Name<sup className="text-red-50">*</sup></label>
                        <input
                            className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            {...register("firstName", { required: true })}
                        ></input>
                        {
                            errors.firstName &&
                            <span>
                                enter your first name
                            </span>
                        }
                    </div>

                    <div>
                        <label
                            className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                            htmlFor='lastName'>Last Name<sup className="text-red-50">*</sup></label>
                        <input type="text"
                            className="bg-[#161d29]  mt-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                            name="lastName"
                            placeholder="Enter last name"
                            {...register("lastName", { required: true })}
                        ></input>
                        {
                            errors.lastName && <span>
                                last name is required
                            </span>
                        }
                    </div>

                </div>

                <div>
                    <label
                        className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                        htmlFor='email'>Email Address<sup className="text-red-50">*</sup></label>
                    <input
                        className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
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
                </div>

                <div className="flex gap-x-4">
                    <label className="w-full relative">
                        <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-60">Create Password<sup className="text-red-50">*</sup></p>
                        <input type={showPassword ? "text" : "password"}
                            className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                            name="password"
                            placeholder="Enter password"
                            required
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


                    <label className="w-full relative">
                        <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-60">Confirm Password<sup className="text-red-50">*</sup></p>
                        <input type={showConfirmPassword ? "text" : "password"}
                            className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                            name="confirmPassword"
                            placeholder="Enter password"
                            required
                            {...register("confirmPassword", { required: true })}
                        ></input>
                        {
                            errors.confirmPassword && <span>
                                confirm password is required
                            </span>
                        }
                        <span
                            className="absolute right-3 top-[43px] cursor-pointer"
                            onClick={() => {
                                setConfirmPassword(!showConfirmPassword);
                            }}>
                            {
                                showConfirmPassword ?

                                    <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf' /> :

                                    <AiOutlineEye fontSize={24} fill='#afb2bf' />
                            }
                        </span>
                    </label>

                </div>

                <div>
                    <label
                        className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                        htmlFor='seatNumber'>Seat Number <sup className="text-red-50">*</sup></label>
                    <input
                        className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="number"
                        name="seatNumber"
                        placeholder="Enter seatNumber address"
                        {...register("seatNumber", { required: true })}
                    ></input>
                    {
                        errors.seatNumber && <span>
                            seatNumber is required
                        </span>
                    }
                </div>

                <div>
                    <label
                        className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                        htmlFor='roomNumber'>Room Number<sup className="text-red-50">*</sup></label>
                    <input
                        className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="number"
                        name="roomNumber"
                        placeholder="Enter room Number"
                        {...register("roomNumber", { required: true })}
                    ></input>
                    {
                        errors.roomNumber && <span>
                            room number is required
                        </span>
                    }
                </div>

                <div>
                    <label
                        className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                        htmlFor='contactNumber'>Contact Number<sup className="text-red-50">*</sup></label>
                    <input
                        className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="number"
                        name="contactNumber"
                        placeholder="Enter Contact Number"
                        {...register("contactNumber", { required: true })}
                    ></input>
                    {
                        errors.contactNumber && <span>
                            contact number is required
                        </span>
                    }
                </div>

                <div>
                    <label
                        className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                        htmlFor='gender'>Gender<sup className="text-red-50">*</sup></label>
                    <input
                        className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="text"
                        name="gender"
                        placeholder="Enter Gender"
                        {...register("gender", { required: true })}
                    ></input>
                    {
                        errors.gender && <span>
                            gender is required
                        </span>
                    }
                </div>

                <div>
                    <label
                        className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                        htmlFor='fatherName'>Father Name<sup className="text-red-50">*</sup></label>
                    <input
                        className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="text"
                        name="fatherName"
                        placeholder="Enter Father Name"
                        {...register("fatherName", { required: true })}
                    ></input>
                    {
                        errors.fatherName && <span>
                            father name is required
                        </span>
                    }
                </div>

                <div>
                    <label
                        className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                        htmlFor='fatherContactNumber'>Father Contact Number<sup className="text-red-50">*</sup></label>
                    <input
                        className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                        type="number"
                        name="fatherContactNumber"
                        placeholder="Enter Contact Number"
                        {...register("fatherContactNumber", { required: true })}
                    ></input>
                    {
                        errors.fatherContactNumber && <span>
                            father contact number is required
                        </span>
                    }
                </div>

                <button type="submit"
                    className="bg-yellow-100 rounded-[8px] mt-7 font-medium text-[#000814] px-[12px] py-[8px] w-full">Allot Room</button>


            </form>
        </div>
    )
}

export default SignupForm   
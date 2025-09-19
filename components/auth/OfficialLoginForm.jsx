'use client'
import React, { useContext } from 'react'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';


const LoginForm = () => {

    const { setUser, setToken } = useContext(AuthContext);
    const [showPassword, setPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const submitHandler = async (data) => {
        const { email, password } = data;
        console.log(email,password);

        const loading = toast.loading("Loading..");
        try {
            const response = await fetch('api/auth/officialLogin',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            });

            const data = await response.json();
            console.log("data :  ", data);

            if (!data.success) {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);


            setUser(data.user);
            console.log(data.user);
            setToken(data.token);
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push(`/${data.user.accountType}/${data.user.accountType}-dashboard`);

            // if (data.user?.accountType === ACCOUNT_TYPE.GATEKEEPER) {
            //     navigate('/gatekeeper-dashboard');
            // }
            // else if (data.user?.accountType === ACCOUNT_TYPE.CLERK) {
            //     navigate('/clerk-dashboard');
            // }
            // else {
            //     navigate('/messofficial-dashboard');
            // }
        } catch (error) {
            console.log("error occurred during login : ", error);
            toast.error("unable to login");
        }
        finally{
            toast.dismiss(loading);
        }
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
                        <p className="text-xs cursor-pointer -mt-3 max-w-max text-blue-300 ml-auto ">forgot password</p>
                </div>

                <button type="submit"
                    className="bg-yellow-100 rounded-[8px] mt-7 font-medium text-[#000814] px-[12px] py-[8px] w-full">Sign In</button>


            </form>

        </div>
    )
}

export default LoginForm;

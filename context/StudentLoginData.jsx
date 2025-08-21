"use client";
import { createContext, useEffect, useState } from "react";

export const StudentLoginContext = createContext();

export const StudentLoginContextProvider = ({children})=>{

    const [studentLoginData,setStudentLoginData]=useState(null);
    
        useEffect(() => {
            const storedData = localStorage.getItem("studentLoginData");

            if (storedData) setStudentLoginData(JSON.parse(storedData));
        }, []);
    
    return (
        <StudentLoginContext.Provider value={{studentLoginData,setStudentLoginData}}>
            {children}
        </StudentLoginContext.Provider>
    )
}
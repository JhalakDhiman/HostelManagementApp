'use client'

import React, { useContext, useEffect, useState } from "react";
import { MdCoPresent } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { AuthContext } from "@context/AuthContext";
import toast from 'react-hot-toast'

const AttendanceDashboard = () => {

    const { user } = useContext(AuthContext);

    const studentId = user?._id;
    const [attendanceData, setAttendanceData] = useState([]);

    const fetchAttendance = async () => {
        const toastId = toast.loading("fetching data ......");
        try {
            const atData = await fetch(`/api/attendance/getAttendance/${studentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await atData.json();
            setAttendanceData(res.data);
        } catch (e) {
            console.log(e);
        }
        finally {
            toast.dismiss(toastId);
        }

    };

    useEffect(() => {
        if (!studentId) {
            return;
        }
        console.log("going to make call");
        fetchAttendance();
    }, [studentId]);


    return (
        <div className="p-10">
            <div className="max-w-4xl mx-auto p-4 bg-richblack-800 text-richblack-5 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Your Attendance Record</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border">
                        <thead className="bg-richblack-700">
                            <tr>
                                <th className="px-4 py-2 border text-left">Date</th>
                                <th className="px-4 py-2 border text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData?.map((record, index) => (
                                <tr key={index} className="hover:bg-richblack-900 cursor-pointer transition">
                                    <td className="px-4 py-2 border">{record.date}</td>
                                    <td className={`px-4 py-2 border rounded`}>
                                        {
                                            record.status === 'Present' ?
                                                <p className='text-caribbeangreen-400 fond-semibold flex items-center gap-2'>
                                                    Present
                                                    <MdCoPresent />
                                                </p>
                                                : <p className="text-red-50 fond-semibold flex items-center gap-2">
                                                    Absent
                                                    <MdCancelPresentation />
                                                </p>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceDashboard;

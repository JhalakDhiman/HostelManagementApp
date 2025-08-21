'use client'

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@context/AuthContext';
import toast from 'react-hot-toast'

const Absentees = () => {
  const { user } = useContext(AuthContext);
  const hostelId = user?.hostel?._id;
  const [absentees, setAbsentees] = useState([]);

  useEffect(() => {
    if (!hostelId) return;
    const fetchAbsentees = async () => {
    const toastId = toast.loading('fetching absent students...');
      try {
        const res = await fetch(`/api/attendance/getAbsentStudents/${hostelId}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await res.json();
        setAbsentees(data.absentees);
      } catch (error) {
        console.error('Error fetching absentees:', error);
      }
      finally{
        toast.dismiss(toastId);
      }
    };

    fetchAbsentees();
  }, [hostelId]);

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl text-richblack-5 font-bold mb-4 text-center">Absent Students</h2>

      {absentees?.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-richblack-900 text-richblack-5 text-sm text-left border border-gray-200">
            <thead className="bg-richblack-800 text-richblack-5 text-xs">
              <tr>
                <th className="px-4 py-3 border">First Name</th>
                <th className="px-4 py-3 border">Last Name</th>
                <th className="px-4 py-3 border">Father's Name</th>
                <th className="px-4 py-3 border">Hostel Name</th>
                <th className="px-4 py-3 border">Gender</th>
                <th className="px-4 py-3 border">Father's Contact</th>
                <th className="px-4 py-3 border">Student Contact</th>
              </tr>
            </thead>
            <tbody className="text-richblue-5">
              {absentees.map((student) => (
                <tr key={student._id} className="hover:bg-richblack-800">
                  <td className="px-4 py-2 border">{student.firstName}</td>
                  <td className="px-4 py-2 border">{student.lastName}</td>
                  <td className="px-4 py-2 border">{student.additionalDetails?.fatherName || '-'}</td>
                  <td className="px-4 py-2 border">{student.hostel?.hostelName || '-'}</td>
                  <td className="px-4 py-2 border">{student.additionalDetails?.gender || '-'}</td>
                  <td className="px-4 py-2 border">{student.additionalDetails?.fatherContactNumber || '-'}</td>
                  <td className="px-4 py-2 border">{student.additionalDetails?.contactNumber || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-richblack-5 mt-8">No absentees found.</p>
      )}
    </div>
  );
};

export default Absentees;

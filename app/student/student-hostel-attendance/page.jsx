'use client'
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '@/context/AuthContext';

const MarkHostelAttendance = () => {
  const { user } = useContext(AuthContext);

  const timestamp = Date.now();
  const date = new Date(timestamp);

  // Extract year, month, and day with proper padding
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`; // ✅ fixed template literal

  console.log(formattedDate);

  const hostelId = user?.hostel?._id;
  const studentId = user?._id;

  const markAttendance = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    };

    const watcher = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        // Stop watching after getting the first accurate reading
        navigator.geolocation.clearWatch(watcher);

        try {
          const response = await fetch('/api/attendance/markHostelAttendance', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lat,
              long,
              studentId,
              hostelId,
              date: formattedDate
            }),
          });

          const data = await response.json();
          console.log(data);

          if (!data.success) {
            toast.error(data.message);
            return;
          }

          toast.success(data.message);
        } catch (err) {
          console.error('API error:', err);
          toast.error('Failed to mark attendance.');
        }
      },
      (error) => {
        console.error('Location error:', error);
        toast.error('Failed to access location.');
      },
      geoOptions
    );
  };


  return (
    <div className="text-richblack-5 p-3 flex justify-center items-center h-full">
      <div className="flex flex-col gap-4">
        <p>Mark Your Attendance Student........................</p>
        <button
          onClick={markAttendance}
          className="bg-yellow-50 text-richblack-900 font-semibold p-2 rounded-lg hover:scale-[0.98] w-[200px]"
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
};

export default MarkHostelAttendance;

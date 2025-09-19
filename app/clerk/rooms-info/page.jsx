'use client'
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'

const RoomsInfo = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async()=>{
    try{
        const response = await fetch('/api/hostel/getRoomsData',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if(!data.success){
            toast.error(data.message);
            return;
        }
        console.log(data);
        setRooms(data.rooms);
    } catch(error){
        console.log(error);
        toast.error("error occured");
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-4 text-richblack-5 bg-richblack-900">
      <h2 className="text-2xl font-bold mb-4">Hostel Room Allotment</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">Room No</th>
              <th className="border px-2 py-1">Seat</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Father Name</th>
              <th className="border px-2 py-1">Father Phone</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => {
              const seats = [room.seat1, room.seat2, room.seat3];
              return seats.map((seat, idx) => (
                <tr key={`${room._id}-${idx}`}>
                  <td className="border px-2 py-1">{room.roomNumber}</td>
                  <td className="border px-2 py-1">Seat {idx + 1}</td>
                  <td className="border px-2 py-1">{seat ? `${seat.firstName} ${seat.lastName}` : ''}</td>
                  <td className="border px-2 py-1">{seat?.email || ''}</td>
                  <td className="border px-2 py-1">{seat?.additionalDetails?.contactNumber || ''}</td>
                  <td className="border px-2 py-1">{seat?.additionalDetails?.fatherName || ''}</td>
                  <td className="border px-2 py-1">{seat?.additionalDetails?.fatherContactNumber || ''}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsInfo;

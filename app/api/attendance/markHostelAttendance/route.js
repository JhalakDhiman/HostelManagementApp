import User from "@models/user.js";
import Attendance from "@models/attendance.js";
import { connectDB } from "@utils/database.js";
import Hostel from "@models/hostel.js"; 

// Haversine distance in meters
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  console.log("lat1 and lat2 : ",lat1,lon1);
  console.log("lat2 and lon2 : ",lat2,lon2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const POST = async (req, res) => {
  await connectDB();
  const { studentId, hostelId, date,lat,long } = await req.json();

  if (!studentId || !hostelId || !date) {
    return new Response(JSON.stringify({ message: `Missing required fields`,success:false}), {
        status: 400,
        headers: { "Content-Type": "application/json" }
    });
  }

  const user = await User.findById(studentId).populate('hostel');
  const userHostel = user.hostel?._id;

  if (!user) {
    return new Response(JSON.stringify({ message: `You are not registered`,success:false}), {
        status: 400,
        headers: { "Content-Type": "application/json" }
    });
  }

  const distance = getDistance(lat,long,lat,long);
  console.log(lat,long);
  console.log(distance);

  if(distance>10){
    return new Response(JSON.stringify({ message: 'distance more than 10 m ',success:false}), {
        status: 400,
        headers: { "Content-Type": "application/json" }
    });
  }

  if (userHostel != hostelId) {
    return new Response(JSON.stringify({ message: 'you are not a student of this hostel',success:false}), {
        status: 400,
        headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Prevent duplicate attendance
    const alreadyMarked = await Attendance.findOne({ studentId, date });
    if (alreadyMarked) {
      return new Response(JSON.stringify({ message: `Attendance already marked for today`,success:false}), {
        status: 400,
        headers: { "Content-Type": "application/json" }
    });
    }

    const newAttendance = new Attendance({
      studentId,
      hostelId,
      date,
      timestamp: new Date(),
      status: "Present"
    });

    console.log("aapki new attendance : ",newAttendance);

    await newAttendance.save();

    return new Response(JSON.stringify({ message: `Attendace marked successfully`,success:true}), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error('Attendance marking failed:', err);
    return new Response(JSON.stringify({ message: `internal server error`,success:false}), {
        status: 400,
        headers: { "Content-Type": "application/json" }
    });
  }
};

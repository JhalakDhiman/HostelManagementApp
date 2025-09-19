import Attendance from "@/models/attendance";
import { connectDB } from "@/utils/database";

function getDateRange(startDateStr, endDateStr) {
  const dates = [];
  let currentDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]); // format: YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export const GET = async (req, {params}) => {
  try {
    await connectDB();
    console.log(params);
    const { studentId } = params;
    console.log(studentId);

    const firstAttendance = await Attendance.findOne({ studentId }).sort({ date: 1 }).limit(1);
    if (!firstAttendance) {
      return new Response(JSON.stringify({ message: `No Attendance found`,data:[] ,success:false}), {
        status: 401,
        headers: { "Content-Type": "application/json" }
    });
    }

    const allAttendance = await Attendance.find({
      studentId,
      date: { $gte: firstAttendance.date, $lte: new Date().toISOString().split('T')[0] }
    }).lean();

    console.log("all attendances of student : ",allAttendance);

    const attendedDatesMap = {};
    allAttendance.forEach(record => {
      attendedDatesMap[record.date] = record.status;
    });

    console.log("attended students : ",attendedDatesMap);

    const fullDateRange = getDateRange(firstAttendance.date, new Date().toISOString().split('T')[0]);

    const finalAttendance = fullDateRange.map(date => ({
      date,
      status: attendedDatesMap[date] || "Absent"
    }));

    return new Response(JSON.stringify({ message: `attendance data fetched successfully` ,success:true,data:finalAttendance}), {
        status: 201,
        headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: `something is wrong` ,success:false}), {
        status: 500,
        headers: { "Content-Type": "application/json" }
    });
  }
}
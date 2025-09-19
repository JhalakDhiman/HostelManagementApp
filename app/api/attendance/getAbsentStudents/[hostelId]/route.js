import User from '@/models/user.js'
import Attendance from '@/models/attendance';
import { connectDB } from '@/utils/database';
import Profile from '@/models/profile'

export const GET = async (req, {params}) => {
  try {
    await connectDB();
    const { hostelId } = params;
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // const hid = new mongoose.Schema.Types.ObjectId(hostelId);

    // Get all students in this hostel
    const allStudents = await User.find({
      // hostel: hid,
      accountType: 'student'
    }).populate('additionalDetails').populate('hostel');

    const presentStudents = await Attendance.find({ hostelId, date: today });

    const presentStudentIds = new Set(presentStudents.map((a) => String(a.studentId)));

    const absentees = allStudents.filter(
      (student) => !presentStudentIds.has(String(student._id))
    );

    return new Response(JSON.stringify({ message: `absentees fetched successfully`,absentees ,success:true}), {
        status: 201,
        headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: `Failed to fetch absentees`,success:false}), {
        status: 500,
        headers: { "Content-Type": "application/json" }
    });
  }
};
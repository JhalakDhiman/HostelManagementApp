import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Hostel",
    required: true,
  },
  date: {
    type: String, // Format: 'YYYY-MM-DD'
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status:{
    type:String,
    enum:["Present","Absent","Leave"],
    default:"Absent"
  }
});

// Prevent duplicate attendance for same student and date
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model('Attendance',attendanceSchema);
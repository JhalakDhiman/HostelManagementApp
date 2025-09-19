import Profile from "@/models/profile";
import Hostel from "@/models/hostel";
import bcrypt from 'bcrypt'
import Room from "@/models/room";
import User from "@/models/user";
import {connectDB} from "@/utils/database";

export const POST = async (req, res) => {
  await connectDB();
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      contactNumber,
      gender,
      roomNumber,
      fatherName,
      fatherContactNumber,
      accountType,
      seatNumber,
      hostelId,
    } = await req.json();

    // console.log("hello here");
    // console.log(email,password,firstName,lastName,accountType,confirmPassword,seatNumber,hostelId)

    if (!email || !password || !confirmPassword || !firstName ||!seatNumber || !lastName || !accountType) {
      return new Response(JSON.stringify({ message: "All fields are required" ,success:false}), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
    }
    console.log("hello here");
    if (seatNumber < 1 || seatNumber > 3) {
      return new Response(JSON.stringify({ message: "invalid seat number" ,success:false}), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ message: "passwords do not match" ,success:false}), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
    }

    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return new Response(JSON.stringify({ message: "hostel not found" ,success:false}), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
    }

    if (roomNumber > hostel.capacity) {
      return new Response(JSON.stringify({ message: "Such room does not exist" ,success:false}), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
    }

    let room = await Room.findOne({ roomNumber: roomNumber, hostel: hostelId });
    if (!room) {
      room = await Room.create({ roomNumber, hostel: hostelId });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" ,success:false}), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(room);

    let sNum = Number(seatNumber);

    if (
      (sNum === 1 && room.seat1) ||
      (sNum === 2 && room.seat2) ||
      (sNum === 3 && room.seat3)
    ) {
      return new Response(JSON.stringify({ message: `seat number ${seatNumber} is already taken` ,success:false}), {
                status: 402,
                headers: { "Content-Type": "application/json" }
            });
    }

    const profileData = await Profile.create({
      gender,
      contactNumber,
      fatherName,
      fatherContactNumber,
    });

    const userData = await User.create({
      firstName,
      lastName,
      email,
      seatNumber:sNum,
      accountType,
      hostel:hostelId,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      additionalDetails: profileData._id,
    });

    
    // console.log(typeof(seatNumber),typeof(3));

    

    if(sNum===1){
      room.seat1 = userData._id;
      await room.save();
    }
    if(sNum===2){
      room.seat2 = userData._id;
      await room.save();
    }
    if(sNum===3){
      room.seat3 = userData._id;
      console.log(room);
      await room.save();
    }

    hostel.seatsAvailable-=1;

    userData.room = room._id;
    await userData.save();

    // if(room.student && room.student.length == room.capacity){
    //   hostel.roomsOccupied+=1;
    //   hostel.save();
    // }

    return new Response(JSON.stringify({ message: "room alloted successfully",room:room._id ,success:true}), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });

  } catch (error) {
    console.log("Error: ", error);
    return new Response(JSON.stringify({ message: "Error occured" ,success:false}), {
                status: 501,
                headers: { "Content-Type": "application/json" }
            });
  }
};
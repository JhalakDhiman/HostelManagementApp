import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@models/user'; 
import Hostel from '@models/hostel';    
import OTP from '@models/otp';        
import {connectDB} from '@utils/database';  
import { hostelClerks } from '@data/hostelClerks'; 

export const POST = async (req) => {
  try {
    await connectDB();

    const { email, password, hostelName, otp } = await req.json();
    console.log("Received login:", { email, password, hostelName, otp });

    if (!email || !password || !otp || !hostelName) {
      return new Response(JSON.stringify({ message: "Please fill all fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const user = await User.findOne({ email }).populate('hostel');
    if (!user) {
      return new Response(JSON.stringify({ message: "User not registered" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const clerkEmail = hostelClerks[hostelName];
    console.log("Clerk email for OTP:", clerkEmail);

    const recentOtp = await OTP.findOne({ email: clerkEmail }).sort({ createdAt: -1 }).exec();

    if (!recentOtp) {
      return new Response(JSON.stringify({ message: "OTP not found for clerk" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log(" OTP match check:", recentOtp.otp, otp);
    if (recentOtp.otp.toString() !== otp.toString()) {
      return new Response(JSON.stringify({ message: "Incorrect OTP" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Incorrect password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "365d"
    });

    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });

    const { password: _, ...safeUser } = user._doc;

    return new Response(JSON.stringify({
      message: "User logged in successfully",
      token,
      success:true,
      user: safeUser
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

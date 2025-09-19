import User from "@/models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import Hostel from "@/models/hostel.js";
import {connectDB} from "@/utils/database";

export const POST = async (req, res) => {
    try {
        await connectDB();

        const { email, password } =  await req.json();
        console.log("email and password are : ", email, password);

        if (!email || !password) {
            return new Response(JSON.stringify({ message: "all fields are required",success:false }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = await User.findOne({ email }).populate('hostel');

        console.log(user);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not registered" ,success:false}), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })

            user.token = token;
            user.password = password;

            return new Response(JSON.stringify({ message: "User logged in",success:true, token, user }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });

        }

        else {
            return new Response(JSON.stringify({ message: "password is incorrect" ,success:false}), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        console.log("Error occurred while logging in : ", error);
        return new Response(JSON.stringify({ message: "login failure",success:false }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
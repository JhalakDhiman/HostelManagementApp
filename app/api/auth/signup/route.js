import User from "@models/user.js";
import connectDB from "@utils/database";
import bcrypt from 'bcryptjs';

export const POST = async(req)=>{

    await connectDB();

    try{

        const {email,password,confirmPassword,firstName,lastName,accountType} = await req.json();

        console.log(email,password,confirmPassword,firstName,lastName,accountType)
 
        if(!email || !password || !confirmPassword || !firstName || !lastName ||!accountType){
            return new Response(JSON.stringify({ message: "Please fill all fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
              });
        }

        if(password!=confirmPassword){
            return new Response(JSON.stringify({ message: "Passwords don't match" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
              });
        }

        const user = await User.findOne({email});
        if(user){
            return new Response(JSON.stringify({ message: "user already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
              });
        }

        // const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        // if(recentOtp.length==0){
        //     return res.status(400).json({
        //         success:false,
        //         message:"otp not found"
        //     })
        // }

        // console.log("recent otp is : ",recentOtp[0].otp);

        // if(recentOtp[0].otp!=otp){
        //     return res.status(401).json({
        //         success:false,
        //         message:"otp is incorrect"
        //     })
        // }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password:hashedPassword,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return new Response(JSON.stringify({ 
            message: "user registered successfully",
            userData
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });

    } catch(error){
        console.log("Error coming while sign up : ",error);
        return new Response(JSON.stringify({ message: "error occurred" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
    }
}
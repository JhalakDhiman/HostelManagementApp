import OTP from "@models/otp.js";
import otpGenerator from 'otp-generator'
import {connectDB} from "@utils/database";

export const POST = async(req)=>{

    await connectDB();

    try{
        const {email} =await req.json();
        console.log("person to which email will be sent : ",email)

        var otp = otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })

        let result =await OTP.findOne({otp});

        while(result){
            otp = otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })
            result =await OTP.findOne({otp});
        }

        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);

        console.log(otpPayload);

        return new Response(JSON.stringify(otpBody),{status:200})

    } catch(error){
        console.log(error);
        return new Response("unale to send otp",{status:500})
    }
}
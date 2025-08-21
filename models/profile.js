import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    dateOfBirth:{
        type:String,
        trim:true,
    },
    gender:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    },
    fatherName:{
        type:String,
    },
    fatherContactNumber:{
        type:Number,
    }
})


export default mongoose.models.Profile || mongoose.model("Profile",profileSchema);

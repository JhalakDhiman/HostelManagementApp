import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    id:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    hostel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hostel"
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    },
    accountType: {
        type: String,
        enum: ["Clerk", "Student", "Messofficial","Gatekeeper"],
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    attendance:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Attendance"
    },
    seatNumber:{
        type:Number,
    }
})

export default  mongoose.models.User|| mongoose.model("User",userSchema);
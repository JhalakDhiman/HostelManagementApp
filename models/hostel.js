import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    hostelName:{
        type:String,
        required:true,
    },
    hostelId:{
        type:String,
    },
    totalRooms:{
        type:Number,
        required:true,
    },
    seatsAvailable:{
        type:Number,
        default:300
    },
    rooms:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Room"
        }
    ],
    warden:{
        type:String,
    },
    clerk:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    gatekeeper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    roomsOccupied:{
        type:Number,
        default:0
    }
})

export default mongoose.models.Hostel || mongoose.model("Hostel",hostelSchema);
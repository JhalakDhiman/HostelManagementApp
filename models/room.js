import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        default:3
    },
    seat1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    seat2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    seat3:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    hostel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hostel"
    },
    floor:{
        type:Number,
    }
})

export default mongoose.models.Room || mongoose.model("Room",roomSchema);
import Room from '@models/room.js'
import {connectDB} from '@utils/database';

export const GET = async (req, res) => {
    await connectDB();
  try {
    const rooms = await Room.find({})
      .populate({
        path: 'seat1',
        populate: { path: 'additionalDetails' }
      })
      .populate({
        path: 'seat2',
        populate: { path: 'additionalDetails' }
      })
      .populate({
        path: 'seat3',
        populate: { path: 'additionalDetails' }
      })
      .sort({ roomNumber: 1 });

    return new Response(JSON.stringify({success:true,rooms}),{
        status:200,
        headers:{"Content-Type":"application/json"}
    });
  } catch (error) {
    console.error("Error fetching clerk dashboard data:", error);
    return new Response(JSON.stringify({success:false,message:"sorry,failed to fetch data"}),{
        status:501,
        headers:{"Content-Type":"application/json"}
    });
  }
};
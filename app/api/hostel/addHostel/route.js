import Hostel from '@/models/hostel.js'

export const POST = async(req,res)=>{
    try{
        const {hostelName,totalRooms} = await req.json();

        await Hostel.create({
            hostelName,totalRooms
        });

        return new Response(JSON.stringify({ message: `hostel added` ,success:true}), {
                status: 201,
                headers: { "Content-Type": "application/json" }
            });
    } catch(error){
        console.log(error);
        return new Response(JSON.stringify({ message: `error occured` ,success:false}), {
                status: 501,
                headers: { "Content-Type": "application/json" }
            });
    }
}
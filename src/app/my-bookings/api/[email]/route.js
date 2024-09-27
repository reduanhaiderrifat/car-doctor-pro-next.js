import connectDB from "@/lib/connectDB";

export const GET = async (request,{params}) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const myBooking = await bookingsCollection.find({ email: params.email }).toArray();
    return Response.json({myBooking})
  } catch (error) {
    console.log(error);
  }
};

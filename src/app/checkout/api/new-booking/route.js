import connectDB from "@/lib/connectDB";

export const POST = async (request) => {
  const booking = await request.json();
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const newBooking = await bookingCollection.insertOne(booking);
    return Response.json({ messsage: "Service Bookes Successfully" });
  } catch (error) {
    return Response.status(500).json({ message: "Error booking service" });
   
  }
};

import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const booking = await request.json();
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const newBooking = await bookingCollection.insertOne(booking);
    return NextResponse.json({ messsage: "Service Bookes Successfully" });
  } catch (error) {
    return NextResponse.status(500).json(
      { message: "Error booking service" },
      error
    );
  }
};

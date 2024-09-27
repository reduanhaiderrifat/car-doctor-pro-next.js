import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const myBooking = await bookingsCollection
      .find({ email: params.email })
      .toArray();
    return NextResponse.json({ myBooking });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, error);
  }
};

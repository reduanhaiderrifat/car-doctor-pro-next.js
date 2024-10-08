import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    // Perform the delete operation
    const res = await bookingsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    // Check if the delete operation was acknowledged
    if (res.deletedCount === 1) {
      return NextResponse.json({
        message: "Booking deleted successfully",
        response: res,
      });
    } else {
      return NextResponse.json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const PATCH = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  const updateDoc = await request.json();
  try {
    const res = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...updateDoc,
        },
      },
      {
        upsert: true,
      }
    );
    return NextResponse.json({ message: "Booking update", response: res });
  } catch (error) {
    return NextResponse.json({
      message: "Booking update wrong",
      response: res,
    });
  }
};
export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ message: "Booking found", response: res });
  } catch (error) {
    return NextResponse.json({ message: "Booking found wrong", response: res });
  }
};

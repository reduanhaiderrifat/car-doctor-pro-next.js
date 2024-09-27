import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const serviceCollection = await db.collection("services");

    // Fetch services
    const result = await serviceCollection.find().toArray();

    // Return the result as JSON
    return new NextResponse.json({ services: result });
  } catch (error) {
    return new NextResponse.json({ message: "No Data Found" }, error);
  }
};

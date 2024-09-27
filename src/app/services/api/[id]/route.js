import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const servicesCollection = db.collection("services");
  try {
    const services = await servicesCollection.findOne({ _id: params.id });
    return NextResponse.json({ services });
  } catch (error) {
    return new NextResponse.json({ message: "Something went wrong" }, error);
  }
};

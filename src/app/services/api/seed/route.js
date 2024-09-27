import connectDB from "@/lib/connectDB";
import { services } from "@/lib/services";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const serviceCollection = await db.collection("services");
  try {
    await serviceCollection.deleteMany();
    const result = await serviceCollection.insertMany(services);
    return NextResponse.json({ message: "Sees successfully insert" });
  } catch (error) {
    return NextResponse.json({ message: "Something wrong" }, error);
  }
};

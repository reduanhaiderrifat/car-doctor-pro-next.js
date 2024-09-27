import connectDB from "@/lib/connectDB";
import { services } from "@/lib/services";

export const GET = async () => {
  const db = await connectDB();
  const serviceCollection = await db.collection("services");
  try {
    await serviceCollection.deleteMany();
    const result = await serviceCollection.insertMany(services);
    return Response.json({ message: "Sees successfully insert" });
  } catch (error) {
    console.log(error);
  }
};

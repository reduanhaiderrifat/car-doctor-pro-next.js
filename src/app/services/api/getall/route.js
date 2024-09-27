import connectDB from "@/lib/connectDB";

export const GET = async () => {
  try {
    const db = await connectDB();
    const serviceCollection = await db.collection("services");
    
    // Fetch services
    const result = await serviceCollection.find().toArray();
    
    // Return the result as JSON
    return new Response(JSON.stringify({ services: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    
  }
};


import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const newUser = await request.json();

    const db = await connectDB();

    if (!db) {
      console.error("Database connection failed");
      return new Response(
        JSON.stringify({ message: "Database connection failed" }),
        { status: 500 }
      );
    }

    const userCollection = db.collection("users");

    const exist = await userCollection.findOne({ email: newUser.email });
    if (exist) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    const hash = bcrypt.hashSync(newUser.password, 14);

    const result = await userCollection.insertOne({
      ...newUser,
      password: hash,
    });

    return new Response(
      JSON.stringify({ message: "New user created successfully", result }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};



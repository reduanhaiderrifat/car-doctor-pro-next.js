import { MongoClient, ServerApiVersion } from "mongodb";

let db; // Declare 'db' as a module-level variable for reuse

const connectDB = async () => {
  if (db) return db; // Return the existing db connection if already established
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u9zrvau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect(); // Ensure the client connects
    db = client.db("cardoctorpro"); // Assign db after successful connection
    console.log("MongoDB connection established");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;

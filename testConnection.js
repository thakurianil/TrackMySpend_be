import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;

const testConnection = async () => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout
    });
    await client.connect();
    console.log("Test connection successful");
    client.close();
  } catch (error) {
    console.error("Test connection error:", error);
  }
};

testConnection();

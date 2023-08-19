import mongoose from "mongoose";

export async function connect() {
  // Try to connect to the database or catch the error
  try {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI!);
    // Get the default connection
    const connection = mongoose.connection;

    // Bind connection and show successfull connection message
    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });
    // Bind connection error and show error message
    connection.on("error", (err) => {
      console.error("MongoDB connection error: ", err);
      // Exit the process if connection fails
      process.exit();
    });
  } catch (error) {
    // Error occurred while connecting to MongoDB
    console.error("Error while connecting to the database: ", error);
  }
}

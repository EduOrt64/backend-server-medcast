import mongoose from "mongoose";

function connectDB(databaseUrl: string, appListen: () => void) {
  mongoose
    .connect(databaseUrl)
    .then(() => {
      console.log("MongoDB connected");
      appListen();
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

export default connectDB;

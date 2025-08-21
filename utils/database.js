import mongoose from "mongoose";

let isConnected = false; // global connection state

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
};

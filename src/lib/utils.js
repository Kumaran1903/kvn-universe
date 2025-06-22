import mongoose from "mongoose";

const connection = {};
export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using Existing Connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error Connecting to DB", err);
  }
};

export function getGuestSessionId() {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(/guestSessionId=([^;]+)/);
  return match ? match[1] : null;
}

import mongoose from "mongoose";
import dns from "node:dns";
// Set custom DNS servers to avoid DNS resolution issues
dns.setServers(["8.8.8.8", "8.8.4.4"]);
export async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URL;
        if (!mongoUri) {
            throw new Error("MONGO_URL environment variable is not defined");
        }
        const conn = await mongoose.connect(mongoUri);
        console.log("MongoDB connected:", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
        // 1 means failure, 0 means success.
    }
}

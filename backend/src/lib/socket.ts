import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const allowdOrigins = process.env.FRONTEND_URL || "http://localhost:5173";

function getResverSocketId(userId: string): string | undefined {
    return userSocketMap[userId];
}
const io = new Server(server, {
    cors: {
        origin: [allowdOrigins],
    },
});

// online users map = {userId: socketId}
const userSocketMap = {} as Record<string, string>;

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    // socket.emit() sends event to everyone - brodcast
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // scoket.on() is used to listen for events
    socket.on("disconnect", () => {
        if (userId) delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io, getResverSocketId };

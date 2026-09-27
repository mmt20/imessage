import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";

import clerkWebhook from "./webhooks/clerk.webhook.js";
const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

// it is important that you don't parse the webhook event data, it should be raw format
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "OK",
    });
});

// if the public directory exists, serve static files from it, otherwise create it and then serve static files from it
// this for production build
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get("/{*any}", (req, res, next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => {
            if (err) {
                next(err);
            }
        });
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is up and running on port ${PORT}`);

    if (process.env.NODE_ENV === "production") job.start();
});

import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

import User from "../models/user.model.js";

export async function protectRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            res.status(404).json({
                message: "User profile is not synced yet",
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in protectRoute middleware:", error.message);
        } else {
            console.error("Error in protectRoute middleware:", error);
        }
        next(error);
    }
}

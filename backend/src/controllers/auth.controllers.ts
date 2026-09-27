import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        res.status(200).json({
            message: "success",
            user: req.user,
        });


    } catch (error) {
        next(error);
    }
}
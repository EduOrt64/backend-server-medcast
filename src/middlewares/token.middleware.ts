import { Request, Response, NextFunction } from "express";
import jwtUtil from "../utils/jwt/jwt.util";

export default async function tokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Authroization : Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = await jwtUtil.verifyAccessToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // @ts-ignore
    req.user = decoded as { _id: string; role: string };

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

import { Request, Response } from "express";

import BaseController from "./base.controller";

import User from "../models/user.model";

class UsersController extends BaseController {
  constructor() {
    super(User);
  }

  async signup(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!["patient", "doctor"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const hashedPassword = this.hashPassword(password);

    const newUser = new this.model({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const hashedPassword = this.hashPassword(password);

    const user = await this.model.findOne({ email, password: hashedPassword });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokens = await this.jwtUtil.createTokens({
      _id: user._id,
      role: user.role,
    });

    return res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }

  async protectedRoute(req: Request, res: Response) {
    res.send("This is a protected route");
  }
}

const usersController = new UsersController();

export default usersController;

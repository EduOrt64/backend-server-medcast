import { Request, Response } from "express";
import config from "../config/config";
import { sha256 } from "../utils/hash/sha256/sha256";
import jwtUtil from "../utils/jwt/jwt.util";

abstract class BaseController {
  model: any;
  config: typeof config;
  hashPassword: (password: string) => string;
  jwtUtil: typeof jwtUtil;

  constructor(model: any) {
    this.model = model;
    this.config = config;
    this.hashPassword = (password: string) => {
      const [leftSalt, rightSalt] = this.config.salt.split("|");
      const salted = `${leftSalt}${password}${rightSalt}`;
      return sha256(salted);
    };
    this.jwtUtil = jwtUtil;
  }

  async create(req: Request, res: Response) {
    try {
      const item = new this.model(req.body);
      const savedItem = await item.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ error: "Failed to create item", details: error });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const items = await this.model.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch items", details: error });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item", details: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      res.send("Update method not implemented");
    } catch (error) {
      res.status(500).json({ error: "Failed to update item", details: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.send("Delete method not implemented");
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item", details: error });
    }
  }
}

export default BaseController;

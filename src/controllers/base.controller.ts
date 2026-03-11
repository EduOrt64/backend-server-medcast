import { Request, Response } from "express";

abstract class BaseController {
  model: any;

  constructor(model: any) {
    this.model = model;
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

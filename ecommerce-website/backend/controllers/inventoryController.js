import Inventory from "../models/Inventory.js";

class InventoryController {
  async getAll(req, res) {
    try {
      const items = await Inventory.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: "Error fetching inventory" });
    }
  }

  async getById(req, res) {
    try {
      const item = await Inventory.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });

      res.json(item);
    } catch (err) {
      res.status(500).json({ message: "Error fetching item" });
    }
  }

  async create(req, res) {
    try {
      const item = await Inventory.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ message: "Error creating item" });
    }
  }

  async update(req, res) {
    try {
      const item = await Inventory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(item);
    } catch (err) {
      res.status(500).json({ message: "Error updating item" });
    }
  }

  async delete(req, res) {
    try {
      await Inventory.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting item" });
    }
  }
}

export default new InventoryController();
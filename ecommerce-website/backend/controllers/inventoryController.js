import Inventory from "../models/Inventory.js";

class InventoryController {
  async getAllItems(req, res) {
    try {
      const items = await Inventory.find();
      return res.status(200).json({
        success: true,
        data: items,
      });
    } catch (error) {
      console.error("getAllItems error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch inventory",
      });
    }
  }

  async getItemById(req, res) {
    try {
      const { id } = req.params;

      const item = await Inventory.findById(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      console.error("getItemById error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch item",
      });
    }
  }

  async addItem(req, res) {
    try {
      const { name, quantity, price, category } = req.body;

      if (!name || quantity == null) {
        return res.status(400).json({
          success: false,
          message: "Name and quantity are required",
        });
      }

      const newItem = new Inventory({
        name,
        quantity,
        price,
        category,
      });

      const saved = await newItem.save();

      return res.status(201).json({
        success: true,
        data: saved,
      });
    } catch (error) {
      console.error("addItem error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to add item",
      });
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params;

      const updated = await Inventory.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      console.error("updateItem error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update item",
      });
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Inventory.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Item deleted successfully",
      });
    } catch (error) {
      console.error("deleteItem error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete item",
      });
    }
  }
}

export default new InventoryController();
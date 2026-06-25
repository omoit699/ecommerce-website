class InventoryController {
  constructor(private inventoryService: any) {}

  async getInventory(req: any, res: any) {
    try {
      const inventory = await this.inventoryService.getAllItems();
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ message: "Error fetching inventory", error });
    }
  }

  async addItem(req: any, res: any) {
    try {
      const newItem = req.body;
      const addedItem = await this.inventoryService.addItem(newItem);
      res.status(201).json(addedItem);
    } catch (error) {
      res.status(500).json({ message: "Error adding item", error });
    }
  }

  async updateItem(req: any, res: any) {
    try {
      const itemId = req.params.id;
      const updatedItem = req.body;
      const result = await this.inventoryService.updateItem(
        itemId,
        updatedItem,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error });
    }
  }

  async deleteItem(req: any, res: any) {
    try {
      const itemId = req.params.id;
      await this.inventoryService.deleteItem(itemId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  }
}

export default InventoryController;

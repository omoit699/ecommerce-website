import Cart from "../models/Cart.js";

class CartController {
  async getCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ userId });
      res.json(cart || { items: [] });
    } catch (err) {
      res.status(500).json({ message: "Error getting cart" });
    }
  }

  async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const itemIndex = cart.items.findIndex(
        (i) => i.productId === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: "Error adding to cart" });
    }
  }

  async removeFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      const cart = await Cart.findOne({ userId });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      cart.items = cart.items.filter((i) => i.productId !== productId);

      await cart.save();
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: "Error removing item" });
    }
  }

  async updateCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      const cart = await Cart.findOne({ userId });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const item = cart.items.find((i) => i.productId === productId);

      if (item) {
        item.quantity = quantity;
      }

      await cart.save();
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: "Error updating cart" });
    }
  }
}

export default new CartController();
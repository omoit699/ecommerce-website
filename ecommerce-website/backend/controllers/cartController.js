import Cart from "../models/Cart.js";

class CartController {
  async getCart(req, res) {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      res.json(cart || { items: [] });
    } catch (err) {
      res.status(500).json({ message: "Error getting cart" });
    }
  }

  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ userId: req.user.id });

      if (!cart) {
        cart = new Cart({ userId: req.user.id, items: [] });
      }

      const item = cart.items.find((i) => i.productId === productId);

      if (item) {
        item.quantity += quantity;
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
      const { productId } = req.body;

      const cart = await Cart.findOne({ userId: req.user.id });

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
      const { productId, quantity } = req.body;

      const cart = await Cart.findOne({ userId: req.user.id });

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
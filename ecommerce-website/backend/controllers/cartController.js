import Cart from "../models/Cart.js";

class CartController {
  async getCart(req, res) {
    const cart =
      (await Cart.findOne({ userId: req.params.userId })) || {
        items: [],
      };

    res.json(cart);
  }

  async addToCart(req, res) {
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) cart = new Cart({ userId: req.params.userId, items: [] });

    const existing = cart.items.find(
      (i) => i.productId === req.body.productId
    );

    if (existing) {
      existing.quantity += req.body.quantity;
    } else {
      cart.items.push(req.body);
    }

    await cart.save();
    res.json(cart);
  }

  async removeFromCart(req, res) {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(
      (i) => i.productId !== req.params.productId
    );

    await cart.save();
    res.json(cart);
  }

  async updateCart(req, res) {
    const cart = await Cart.findOne({ userId: req.params.userId });

    const item = cart?.items.find(
      (i) => i.productId === req.params.productId
    );

    if (item) item.quantity = req.body.quantity;

    await cart.save();
    res.json(cart);
  }
}

export default new CartController();
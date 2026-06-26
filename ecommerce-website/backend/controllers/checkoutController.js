import Order from "../models/Order.js";

class CheckoutController {
  async processOrder(req, res) {
    const order = await Order.create(req.body);
    res.status(201).json({ order });
  }

  async getOrderHistory(req, res) {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.json({ orders });
  }

  async getOrderById(req, res) {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
  }
}

export default new CheckoutController();
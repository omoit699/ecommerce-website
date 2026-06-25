class CartController {
  constructor(cartService) {
    this.cartService = cartService;
  }

  async getCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await this.cartService.getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving cart", error });
    }
  }

  async addItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const updatedCart = await this.cartService.addItemToCart(
        userId,
        productId,
        quantity,
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Error adding item to cart", error });
    }
  }

  async removeItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const updatedCart = await this.cartService.removeItemFromCart(
        userId,
        productId,
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart", error });
    }
  }

  async updateItemQuantity(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const { quantity } = req.body;
      const updatedCart = await this.cartService.updateItemQuantity(
        userId,
        productId,
        quantity,
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Error updating item quantity", error });
    }
  }
}

export default CartController;

import Product from "../models/Product.js";

class ProductController {
  async getAllProducts(req, res) {
    const { category } = req.query;

    const products = await Product.find(
      category ? { category } : {}
    );

    res.json(products);
  }

  async getProductById(req, res) {
    const product = await Product.findById(req.params.id);
    res.json(product);
  }

  async createProduct(req, res) {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  }

  async updateProduct(req, res) {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  }

  async deleteProduct(req, res) {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  }
}

export default new ProductController();
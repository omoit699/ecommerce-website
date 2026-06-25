class ProductController {
  async getAllProducts(req, res) {
    // Logic to fetch all products from the database
    try {
      const products = await Product.find(); // Assuming Product is a model
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  }

  async getProductById(req, res) {
    // Logic to fetch a single product by ID
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error });
    }
  }

  async createProduct(req, res) {
    // Logic to create a new product
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ message: "Error creating product", error });
    }
  }

  async updateProduct(req, res) {
    // Logic to update an existing product
    const { id } = req.params;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: "Error updating product", error });
    }
  }

  async deleteProduct(req, res) {
    // Logic to delete a product
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error });
    }
  }
}

export default new ProductController();

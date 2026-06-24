class Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    description: string;

    constructor(id: number, name: string, price: number, imageUrl: string, category: string, description: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.description = description;
    }
}

export default Product;
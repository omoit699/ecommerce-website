class Cart {
    items: Array<{ productId: string; quantity: number }>;
    totalPrice: number;

    constructor() {
        this.items = [];
        this.totalPrice = 0;
    }

    addItem(productId: string, quantity: number, price: number) {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ productId, quantity });
        }
        this.totalPrice += price * quantity;
    }

    removeItem(productId: string, price: number) {
        const itemIndex = this.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            this.totalPrice -= this.items[itemIndex].quantity * price;
            this.items.splice(itemIndex, 1);
        }
    }

    updateQuantity(productId: string, quantity: number, price: number) {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            const priceDifference = (quantity - existingItem.quantity) * price;
            existingItem.quantity = quantity;
            this.totalPrice += priceDifference;
        }
    }

    clearCart() {
        this.items = [];
        this.totalPrice = 0;
    }
}

export default Cart;
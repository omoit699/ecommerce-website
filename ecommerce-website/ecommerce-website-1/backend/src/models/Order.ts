class Order {
    constructor(
        public orderId: string,
        public userId: string,
        public items: Array<{ productId: string; quantity: number; price: number }>,
        public totalAmount: number,
        public orderDate: Date,
        public status: string
    ) {}
}

export default Order;
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
            enum: ['Electronics', 'Clothes', 'Shoes'],
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
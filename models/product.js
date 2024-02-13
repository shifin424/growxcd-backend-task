import mongoose from 'mongoose';

const OfferTypeEnum = ['Amount', 'Percentage', 'ByOneGetSame', 'ByOneGetOther', 'NoOffer'];

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    productImage: {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
    },
    description: {
        type: String,
        required: true,
    },
    offers: {
        offerType: {
            type: String,
            enum: OfferTypeEnum,
            required: true,
        },
        flatAmount: {
            type: Number,
        },
        flatPercentage: {
            type: Number,
        },
        offerProductId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;

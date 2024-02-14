import Product from "../models/product.js";

export const addProducts = async (req, res, next) => {
    try {
        const {
            productName,
            productPrice,
            stock,
            description,
            offerType,
            discountAmount,
            discountPercentage,
            selectedProduct,
            otherProduct,
        } = req.body;

        const productImage = {
            url: req.file.path,
            publicId: req.file.filename,
        };

        let offers = {};

        switch (offerType) {
            case "Amount":
                if (!discountAmount) {
                    return res.status(400).json({ error: "Discount amount is required for Flat Amount offer." });
                }
                offers = { offerType, flatAmount: discountAmount };
                break;

            case "Percentage":
                if (!discountPercentage) {
                    return res.status(400).json({ error: "Discount percentage is required for Flat Percentage offer." });
                }
                offers = { offerType, flatPercentage: discountPercentage };
                break;

            case "BuyOneGetOne":
                if (!selectedProduct) {
                    return res.status(400).json({ error: "Selected product is required for Buy One Get One offer." });
                }

                if (selectedProduct === "Same Product") {
                    offers = { offerType: 'ByOneGetSame', selectedProduct };
                } else if (selectedProduct === "Different Product" && otherProduct) {
                    offers = { offerType: 'ByOneGetOther', selectedProduct, offerProductId: otherProduct };
                } else {
                    return res.status(400).json({ error: "Invalid Buy One Get One offer." });
                }
                break;

            case "NoOffer":
                offers = { offerType: offerType };
                break;
            default:
                return res.status(400).json({ error: "Invalid offer type." });
        }

        const productData = {
            productName,
            productPrice,
            stock,
            description,
            productImage,
            offers,
        };

        const newProduct = await Product.create(productData);

        return res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        return next(err)
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .populate({
                path: 'offers.offerProductId',
                model: 'Product',
                select: 'productName',
            });

        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

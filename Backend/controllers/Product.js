import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
    try {
         if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Product images are required" });
        }
        const images = req.files.map(file => `/uploads/products/${file.filename}`);

        const product = await Product.create({
            ...req.body,
            images,
            createdBy: req.user._id
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
        
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isAvailable: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(
                file => `/uploads/products/${file.filename}`
            );
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

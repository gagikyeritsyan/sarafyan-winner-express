const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const products = await prisma.product.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve products" });
    }
};

const product = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.product.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve product" });
    }
};

const add = async (req, res) => {
    const { lang, image, btn_text, title, description } = req.body;

    if (!lang || !image || !btn_text || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newProduct = await prisma.product.create({
            data: { lang, image, btn_text, title, description },
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add product" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, image, btn_text, title, description } = req.body;

    if (!lang || !image || !btn_text || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.product.update({
            where: { id },
            data: { lang, image, btn_text, title, description },
        });
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(500).json({ message: "Failed to update product" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(500).json({ message: "Failed to delete product" });
    }
};

module.exports = {
    all,
    product,
    add,
    edit,
    remove,
};

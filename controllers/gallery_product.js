const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const products = await prisma.gallery_product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve gallery products" });
    }
};

const gallery_product = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.gallery_product.findUnique({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "Gallery product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve gallery product" });
    }
};

const add = async (req, res) => {
    const { img_url } = req.body;

    if (!img_url) {
        return res.status(400).json({ message: "Image URL is required" });
    }

    try {
        const newProduct = await prisma.gallery_product.create({
            data: { img_url }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add gallery product" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { img_url } = req.body;

    if (!img_url) {
        return res.status(400).json({ message: "Image URL is required" });
    }

    try {
        await prisma.gallery_product.update({
            where: { id },
            data: { img_url }
        });
        res.status(200).json({ message: "Gallery product updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Gallery product not found" });
        }
        res.status(500).json({ message: "Failed to update gallery product" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.gallery_product.delete({ where: { id } });
        res.status(200).json({ message: "Gallery product deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Gallery product not found" });
        }
        res.status(500).json({ message: "Failed to delete gallery product" });
    }
};

module.exports = {
    all,
    gallery_product,
    add,
    edit,
    remove,
};

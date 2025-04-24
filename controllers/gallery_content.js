const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const content = await prisma.gallery_content.findMany();
        res.status(200).json(content);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve gallery content" });
    }
};

const gallery_content = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.gallery_content.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ message: "Gallery content not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve gallery content" });
    }
};

const add = async (req, res) => {
    const { img_url } = req.body;

    if (!img_url) {
        return res.status(400).json({ message: "img_url is required" });
    }

    try {
        const newItem = await prisma.gallery_content.create({
            data: { img_url },
        });
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add gallery content" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { img_url } = req.body;

    if (!img_url) {
        return res.status(400).json({ message: "img_url is required" });
    }

    try {
        await prisma.gallery_content.update({
            where: { id },
            data: { img_url },
        });
        res.status(200).json({ message: "Gallery content updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Gallery content not found" });
        }
        res.status(500).json({ message: "Failed to update gallery content" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.gallery_content.delete({ where: { id } });
        res.status(200).json({ message: "Gallery content deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Gallery content not found" });
        }
        res.status(500).json({ message: "Failed to delete gallery content" });
    }
};

module.exports = {
    all,
    gallery_content,
    add,
    edit,
    remove,
};

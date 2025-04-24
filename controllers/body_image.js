const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const images = await prisma.body_image.findMany();
        res.status(200).json(images);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve body images" });
    }
};

const bodyImage = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await prisma.body_image.findUnique({ where: { id } });
        if (!image) {
            return res.status(404).json({ message: "Body image not found" });
        }
        res.status(200).json(image);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve body image" });
    }
};

const add = async (req, res) => {
    const { background_img1 } = req.body;

    if (!background_img1) {
        return res.status(400).json({ message: "Image field is required" });
    }

    try {
        const image = await prisma.body_image.create({
            data: { background_img1 },
        });
        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add body image" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.body_image.delete({ where: { id } });
        res.status(200).json({ message: "Body image deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Body image not found" });
        }
        res.status(500).json({ message: "Failed to delete body image" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { background_img1 } = req.body;

    if (!background_img1) {
        return res.status(400).json({ message: "Image field is required" });
    }

    try {
        await prisma.body_image.update({
            where: { id },
            data: { background_img1 },
        });
        res.status(200).json({ message: "Body image updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Body image not found" });
        }
        res.status(500).json({ message: "Failed to update body image" });
    }
};

module.exports = {
    all,
    bodyImage,
    add,
    remove,
    edit,
};

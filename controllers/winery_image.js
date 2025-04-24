const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const images = await prisma.winery_image.findMany();
        res.status(200).json(images);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve winery images" });
    }
};

const winery_image = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await prisma.winery_image.findUnique({ where: { id } });
        if (!image) {
            return res.status(404).json({ message: "Winery image not found" });
        }
        res.status(200).json(image);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve winery image" });
    }
};

const add = async (req, res) => {
    const { background_image, img_url1, img_url2, img_url3 } = req.body;

    if (!background_image || !img_url1 || !img_url2 || !img_url3) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newImage = await prisma.winery_image.create({
            data: {
                background_image,
                img_url1,
                img_url2,
                img_url3
            }
        });
        res.status(201).json(newImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add winery image" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { background_image, img_url1, img_url2, img_url3 } = req.body;

    if (!background_image || !img_url1 || !img_url2 || !img_url3) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.winery_image.update({
            where: { id },
            data: {
                background_image,
                img_url1,
                img_url2,
                img_url3
            }
        });
        res.status(200).json({ message: "Winery image updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Winery image not found" });
        }
        res.status(500).json({ message: "Failed to update winery image" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.winery_image.delete({ where: { id } });
        res.status(200).json({ message: "Winery image deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Winery image not found" });
        }
        res.status(500).json({ message: "Failed to delete winery image" });
    }
};

module.exports = {
    all,
    winery_image,
    add,
    edit,
    remove,
};

const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const logos = await prisma.header_main_logo.findMany();
        res.status(200).json(logos);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve header logos" });
    }
};

const logo = async (req, res) => {
    const { id } = req.params;
    try {
        const headerLogo = await prisma.header_main_logo.findUnique({ where: { id } });
        if (!headerLogo) {
            return res.status(404).json({ message: "Logo not found" });
        }
        res.status(200).json(headerLogo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve logo" });
    }
};

const add = async (req, res) => {
    const { url, img_url } = req.body;

    if (!url || !img_url) {
        return res.status(400).json({ message: "Both url and img_url are required" });
    }

    try {
        const newLogo = await prisma.header_main_logo.create({
            data: { url, img_url },
        });
        res.status(201).json(newLogo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add logo" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { url, img_url } = req.body;

    if (!url || !img_url) {
        return res.status(400).json({ message: "Both url and img_url are required" });
    }

    try {
        await prisma.header_main_logo.update({
            where: { id },
            data: { url, img_url },
        });
        res.status(200).json({ message: "Logo updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Logo not found" });
        }
        res.status(500).json({ message: "Failed to update logo" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.header_main_logo.delete({ where: { id } });
        res.status(200).json({ message: "Logo deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Logo not found" });
        }
        res.status(500).json({ message: "Failed to delete logo" });
    }
};

module.exports = {
    all,
    logo,
    add,
    edit,
    remove,
};

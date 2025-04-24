const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const infos = await prisma.winery_info.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(infos);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve winery information" });
    }
};

const winery_info = async (req, res) => {
    const { id } = req.params;
    try {
        const info = await prisma.winery_info.findUnique({ where: { id } });
        if (!info) {
            return res.status(404).json({ message: "Winery info not found" });
        }
        res.status(200).json(info);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve winery info" });
    }
};

const add = async (req, res) => {
    const { lang, title, description } = req.body;

    if (!lang || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newInfo = await prisma.winery_info.create({
            data: { lang, title, description }
        });
        res.status(201).json(newInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add winery info" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title, description } = req.body;

    if (!lang || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.winery_info.update({
            where: { id },
            data: { lang, title, description }
        });
        res.status(200).json({ message: "Winery info updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Winery info not found" });
        }
        res.status(500).json({ message: "Failed to update winery info" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.winery_info.delete({ where: { id } });
        res.status(200).json({ message: "Winery info deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Winery info not found" });
        }
        res.status(500).json({ message: "Failed to delete winery info" });
    }
};

module.exports = {
    all,
    winery_info,
    add,
    edit,
    remove,
};

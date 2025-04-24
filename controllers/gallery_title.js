const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const titles = await prisma.gallery_title.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(titles);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve gallery titles" });
    }
};

const gallery_title = async (req, res) => {
    const { id } = req.params;
    try {
        const title = await prisma.gallery_title.findUnique({ where: { id } });
        if (!title) {
            return res.status(404).json({ message: "Gallery title not found" });
        }
        res.status(200).json(title);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve gallery title" });
    }
};

const add = async (req, res) => {
    const { lang, title, subTitle } = req.body;

    if (!lang || !title || !subTitle) {
        return res.status(400).json({ message: "lang, title, and subTitle are required" });
    }

    try {
        const newTitle = await prisma.gallery_title.create({
            data: { lang, title, subTitle },
        });
        res.status(201).json(newTitle);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Failed to add gallery title" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title, subTitle } = req.body;

    if (!lang || !title || !subTitle) {
        return res.status(400).json({ message: "lang, title, and subTitle are required" });
    }

    try {
        await prisma.gallery_title.update({
            where: { id },
            data: { lang, title, subTitle },
        });
        res.status(200).json({ message: "Gallery title updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Gallery title not found" });
        }
        res.status(500).json({ message: "Failed to update gallery title" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.gallery_title.delete({ where: { id } });
        res.status(200).json({ message: "Gallery title deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Gallery title not found" });
        }
        res.status(500).json({ message: "Failed to delete gallery title" });
    }
};

module.exports = {
    all,
    gallery_title,
    add,
    edit,
    remove,
};

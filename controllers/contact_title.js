const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const titles = await prisma.contact_title.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(titles);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact titles" });
    }
};

const contact_title = async (req, res) => {
    const { id } = req.params;
    try {
        const title = await prisma.contact_title.findUnique({ where: { id } });
        if (!title) {
            return res.status(404).json({ message: "Contact title not found" });
        }
        res.status(200).json(title);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact title" });
    }
};

const add = async (req, res) => {
    const { lang, title, img_url } = req.body;

    if (!lang || !title || !img_url) {
        return res.status(400).json({ message: "lang, title, and img_url are required" });
    }

    try {
        const newTitle = await prisma.contact_title.create({
            data: { lang, title, img_url },
        });
        res.status(201).json(newTitle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add contact title" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title, img_url } = req.body;

    if (!lang || !title || !img_url) {
        return res.status(400).json({ message: "lang, title, and img_url are required" });
    }

    try {
        await prisma.contact_title.update({
            where: { id },
            data: { lang, title, img_url },
        });
        res.status(200).json({ message: "Contact title updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact title not found" });
        }
        res.status(500).json({ message: "Failed to update contact title" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.contact_title.delete({ where: { id } });
        res.status(200).json({ message: "Contact title deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact title not found" });
        }
        res.status(500).json({ message: "Failed to delete contact title" });
    }
};

module.exports = {
    all,
    contact_title,
    add,
    edit,
    remove,
};

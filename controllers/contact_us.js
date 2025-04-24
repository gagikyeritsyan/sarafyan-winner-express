const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const contacts = await prisma.contact_us.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact data" });
    }
};

const contact_us = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.contact_us.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ message: "Contact item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact item" });
    }
};

const add = async (req, res) => {
    const { lang, title, span, description, image } = req.body;

    if (!lang || !title || !span || !description || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newContact = await prisma.contact_us.create({
            data: {
                lang,
                title,
                span,
                description,
                image
            }
        });
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add contact item" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title, span, description, image } = req.body;

    if (!lang || !title || !span || !description || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.contact_us.update({
            where: { id },
            data: {
                lang,
                title,
                span,
                description,
                image
            }
        });
        res.status(200).json({ message: "Contact item updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact item not found" });
        }
        res.status(500).json({ message: "Failed to update contact item" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.contact_us.delete({ where: { id } });
        res.status(200).json({ message: "Contact item deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact item not found" });
        }
        res.status(500).json({ message: "Failed to delete contact item" });
    }
};

module.exports = {
    all,
    contact_us,
    add,
    edit,
    remove,
};

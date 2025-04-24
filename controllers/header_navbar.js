const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const navItems = await prisma.header_navbar.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(navItems);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve navbar items" });
    }
};

const header_navbar = async (req, res) => {
    const { id } = req.params;
    try {
        const navItem = await prisma.header_navbar.findUnique({
            where: { id: parseInt(id) },
        });
        if (!navItem) {
            return res.status(404).json({ message: "Navbar item not found" });
        }
        res.status(200).json(navItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve navbar item" });
    }
};

const add = async (req, res) => {
    const { lang, title, route, url } = req.body;

    if (!lang || !title || !route || !url) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const navItem = await prisma.header_navbar.create({
            data: { lang, title, route, url },
        });
        res.status(201).json(navItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add navbar item" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title, route, url } = req.body;

    if (!lang || !title || !route || !url) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.header_navbar.update({
            where: { id: parseInt(id) },
            data: { lang, title, route, url },
        });
        res.status(200).json({ message: "Navbar item updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Navbar item not found" });
        }
        res.status(500).json({ message: "Failed to update navbar item" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.header_navbar.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Navbar item deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Navbar item not found" });
        }
        res.status(500).json({ message: "Failed to delete navbar item" });
    }
};

module.exports = {
    all,
    header_navbar,
    add,
    edit,
    remove,
};

const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const titles = await prisma.about_title.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(titles);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve about titles" });
    }
};

const about_title = async (req, res) => {
    const { id } = req.params;
    try {
        const title = await prisma.about_title.findUnique({ where: { id } });
        if (!title) {
            return res.status(404).json({ message: "About title not found" });
        }
        res.status(200).json(title);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve about title" });
    }
};

const add = async (req, res) => {
    const { lang, title } = req.body;

    if (!lang || !title) {
        return res.status(400).json({ message: "Both lang and title are required" });
    }

    try {
        const newTitle = await prisma.about_title.create({
            data: { lang, title },
        });
        res.status(201).json(newTitle);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Failed to add About title" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title } = req.body;

    if (!lang || !title) {
        return res.status(400).json({ message: "Both lang and title are required" });
    }

    try {
        await prisma.about_title.update({
            where: { id },
            data: { lang, title },
        });
        res.status(200).json({ message: "About title updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "About title not found" });
        }
        res.status(500).json({ message: "Failed to update about title" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.about_title.delete({ where: { id } });
        res.status(200).json({ message: "About title deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "About title not found" });
        }
        res.status(500).json({ message: "Failed to delete about title" });
    }
};

module.exports = {
    all,
    about_title,
    add,
    edit,
    remove,
};

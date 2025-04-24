const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const languages = await prisma.header_language.findMany();
        res.status(200).json(languages);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve languages" });
    }
};

const header_language = async (req, res) => {
    const { id } = req.params;
    try {
        const language = await prisma.header_language.findUnique({
            where: { id },
        });
        if (!language) {
            return res.status(404).json({ message: "Language not found" });
        }
        res.status(200).json(language);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve language" });
    }
};

const add = async (req, res) => {
    const { lang, title } = req.body;

    if (!lang || !title) {
        return res.status(400).json({ message: "Both lang and title are required" });
    }

    try {
        const newLanguage = await prisma.header_language.create({
            data: { lang, title },
        });
        res.status(201).json(newLanguage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add language" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title } = req.body;

    if (!lang || !title) {
        return res.status(400).json({ message: "Both lang and title are required" });
    }

    try {
        await prisma.header_language.update({
            where: { id },
            data: { lang, title },
        });
        res.status(200).json({ message: "Language updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Language not found" });
        }
        res.status(500).json({ message: "Failed to update language" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.header_language.delete({ where: { id } });
        res.status(200).json({ message: "Language deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Language not found" });
        }
        res.status(500).json({ message: "Failed to delete language" });
    }
};

module.exports = {
    all,
    header_language,
    add,
    edit,
    remove,
};

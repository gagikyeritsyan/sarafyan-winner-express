const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const stories = await prisma.winery_our_story.findMany(lang && {
            where: {
                lang,
            }
        });

        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve winery information" });
    }
};

const winery_our_story = async (req, res) => {
    const { id } = req.params;
    
    try {
        const story = await prisma.winery_our_story.findUnique({ where: { id } });
        if (!story) {
            return res.status(404).json({ message: "Winery story not found" });
        }
        res.status(200).json(story);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve winery story" });
    }
};

const add = async (req, res) => {
    const { lang, title, description } = req.body;

    if (!lang || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newStory = await prisma.winery_our_story.create({
            data: {
                lang,
                title,
                description
            }
        });
        res.status(201).json(newStory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add winery story" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, title, description } = req.body;

    if (!lang || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.winery_our_story.update({
            where: { id },
            data: {
                lang,
                title,
                description
            }
        });
        res.status(200).json({ message: "Winery story updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Winery story not found" });
        }
        res.status(500).json({ message: "Failed to update winery story" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.winery_our_story.delete({ where: { id } });
        res.status(200).json({ message: "Winery story deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Winery story not found" });
        }
        res.status(500).json({ message: "Failed to delete winery story" });
    }
};

module.exports = {
    all,
    winery_our_story,
    add,
    edit,
    remove,
};

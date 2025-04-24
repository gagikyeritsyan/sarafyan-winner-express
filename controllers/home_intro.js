const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const intros = await prisma.home_intro.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(intros);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve home intro data" });
    }
};

const home_intro = async (req, res) => {
    const { id } = req.params;
    try {
        const intro = await prisma.home_intro.findUnique({ where: { id } });
        if (!intro) {
            return res.status(404).json({ message: "Home intro not found" });
        }
        res.status(200).json(intro);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve home intro" });
    }
};

const add = async (req, res) => {
    const { lang, videoUrl, mainHeading, subHeading } = req.body;

    if (!lang || !videoUrl || !mainHeading || !subHeading) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newIntro = await prisma.home_intro.create({
            data: { lang, videoUrl, mainHeading, subHeading },
        });
        res.status(201).json(newIntro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add home intro" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const { lang, videoUrl, mainHeading, subHeading } = req.body;

    if (!lang || !videoUrl || !mainHeading || !subHeading) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.home_intro.update({
            where: { id },
            data: { lang, videoUrl, mainHeading, subHeading },
        });
        res.status(200).json({ message: "Home intro updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Home intro not found" });
        }
        res.status(500).json({ message: "Failed to update home intro" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.home_intro.delete({ where: { id } });
        res.status(200).json({ message: "Home intro deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Home intro not found" });
        }
        res.status(500).json({ message: "Failed to delete home intro" });
    }
};

module.exports = {
    all,
    home_intro,
    add,
    edit,
    remove,
};

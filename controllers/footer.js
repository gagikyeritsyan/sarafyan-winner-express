const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const footers = await prisma.footer.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(footers);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve footer data" });
    }
};

const footer = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.footer.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ message: "Footer item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve footer item" });
    }
};

const add = async (req, res) => {
    const {
        lang, background_img, logo_img,
        title, address, email,
        phone1, phone2
    } = req.body;

    if (
        !lang || !background_img || !logo_img ||
        !title || !address || !email ||
        !phone1 || !phone2
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newFooter = await prisma.footer.create({
            data: {
                lang, background_img, logo_img,
                title, address, email,
                phone1, phone2
            }
        });
        res.status(201).json(newFooter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add footer item" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const {
        lang, background_img, logo_img,
        title, address, email,
        phone1, phone2
    } = req.body;

    if (
        !lang || !background_img || !logo_img ||
        !title || !address || !email ||
        !phone1 || !phone2
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.footer.update({
            where: { id },
            data: {
                lang, background_img, logo_img,
                title, address, email,
                phone1, phone2
            }
        });
        res.status(200).json({ message: "Footer updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Footer item not found" });
        }
        res.status(500).json({ message: "Failed to update footer item" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.footer.delete({ where: { id } });
        res.status(200).json({ message: "Footer item deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Footer item not found" });
        }
        res.status(500).json({ message: "Failed to delete footer item" });
    }
};

module.exports = {
    all,
    footer,
    add,
    edit,
    remove,
};

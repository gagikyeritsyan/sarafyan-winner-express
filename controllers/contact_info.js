const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const infoList = await prisma.contact_info.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(infoList);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact info" });
    }
};

const contact_info = async (req, res) => {
    const { id } = req.params;
    try {
        const info = await prisma.contact_info.findUnique({ where: { id } });
        if (!info) {
            return res.status(404).json({ message: "Contact info not found" });
        }
        res.status(200).json(info);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact info" });
    }
};

const add = async (req, res) => {
    const {
        lang, name,
        icons1, href1,
        icons2, phone1, phone2,
        icons3, mail1, mail2
    } = req.body;

    if (
        !lang || !name ||
        !icons1 || !href1 ||
        !icons2 || !phone1 || !phone2 ||
        !icons3 || !mail1 || !mail2
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newInfo = await prisma.contact_info.create({
            data: {
                lang, name,
                icons1, href1,
                icons2, phone1, phone2,
                icons3, mail1, mail2
            }
        });
        res.status(201).json(newInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add contact info" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const {
        lang, name,
        icons1, href1,
        icons2, phone1, phone2,
        icons3, mail1, mail2
    } = req.body;

    if (
        !lang || !name ||
        !icons1 || !href1 ||
        !icons2 || !phone1 || !phone2 ||
        !icons3 || !mail1 || !mail2
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.contact_info.update({
            where: { id },
            data: {
                lang, name,
                icons1, href1,
                icons2, phone1, phone2,
                icons3, mail1, mail2
            }
        });
        res.status(200).json({ message: "Contact info updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact info not found" });
        }
        res.status(500).json({ message: "Failed to update contact info" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.contact_info.delete({ where: { id } });
        res.status(200).json({ message: "Contact info deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact info not found" });
        }
        res.status(500).json({ message: "Failed to delete contact info" });
    }
};

module.exports = {
    all,
    contact_info,
    add,
    edit,
    remove,
};

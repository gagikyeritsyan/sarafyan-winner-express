const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    const lang = req.query.lang || '';
    try {
        const messages = await prisma.contact_message.findMany(
            lang ? { where: { lang } } : {}
        );
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact message data" });
    }
};

const contact_message = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await prisma.contact_message.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ message: "Contact message not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to retrieve contact message" });
    }
};

const add = async (req, res) => {
    const {
        lang,
        input_name_placeholder,
        input_last_name_placeholder,
        input_email_placeholder,
        input_tel_placeholder,
        textarea_placeholder,
        btn_text
    } = req.body;

    if (
        !lang ||
        !input_name_placeholder ||
        !input_last_name_placeholder ||
        !input_email_placeholder ||
        !input_tel_placeholder ||
        !textarea_placeholder ||
        !btn_text
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newMessage = await prisma.contact_message.create({
            data: {
                lang,
                input_name_placeholder,
                input_last_name_placeholder,
                input_email_placeholder,
                input_tel_placeholder,
                textarea_placeholder,
                btn_text
            }
        });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add contact message" });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    const {
        lang,
        input_name_placeholder,
        input_last_name_placeholder,
        input_email_placeholder,
        input_tel_placeholder,
        textarea_placeholder,
        btn_text
    } = req.body;

    if (
        !lang ||
        !input_name_placeholder ||
        !input_last_name_placeholder ||
        !input_email_placeholder ||
        !input_tel_placeholder ||
        !textarea_placeholder ||
        !btn_text
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.contact_message.update({
            where: { id },
            data: {
                lang,
                input_name_placeholder,
                input_last_name_placeholder,
                input_email_placeholder,
                input_tel_placeholder,
                textarea_placeholder,
                btn_text
            }
        });
        res.status(200).json({ message: "Contact message updated successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact message not found" });
        }
        res.status(500).json({ message: "Failed to update contact message" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.contact_message.delete({ where: { id } });
        res.status(200).json({ message: "Contact message deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Contact message not found" });
        }
        res.status(500).json({ message: "Failed to delete contact message" });
    }
};

module.exports = {
    all,
    contact_message,
    add,
    edit,
    remove,
};

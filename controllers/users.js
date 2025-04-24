
const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });

    res.status(200).json({message: 'User created successfully'});
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await prisma.user.findFirst(
        { where: { username } }
    );

    const isCorrectPassword = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isCorrectPassword && secret) {
        res.status(200).json({
            id: user.id,
            username: user.username,
            token: jwt.sign({ id: user.id, username: user.username }, secret),
        });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
}

module.exports = {
    register,
    login,
}
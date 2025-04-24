const expressListEndpoints = require('express-list-endpoints');

const endpoints = async (req, res) => {
    const endpoints = expressListEndpoints(req.app);
    res.status(200).json(endpoints);
};

module.exports = {
    endpoints,
}
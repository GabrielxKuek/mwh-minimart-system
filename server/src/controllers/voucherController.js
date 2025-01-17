const { selectVoucherByUserId, selectVoucherProductById } = require('../models/voucherModel');

module.exports.readVoucherByUserId = async (req, res, next) => {
    try {
        const userId = req.headers.userid;
        const data = await selectVoucherByUserId(userId);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server Error");
    }
}

module.exports.readVoucherProductById = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const data = await selectVoucherProductById(productId);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server Error");
    }
}

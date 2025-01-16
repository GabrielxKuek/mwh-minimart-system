const { selectVoucherByAll, selectVoucherProductById } = require('../models/voucherModel');

module.exports.readVoucherByAll = async (req, res, next) => {
    try {
        const data = await selectVoucherByAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server Error");
    }
}

module.exports.readVoucherProductById = async (req, res, next) => {
    const { voucherId } = req.params;

    try {
        const data = await selectVoucherProductById(voucherId);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server Error");
    }
}

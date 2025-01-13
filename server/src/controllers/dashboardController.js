module.exports.readAllVoucherByUser = (req, res, next) => {
    res.status(200).send([
        {
            voucher_id: 1,
            status_id: 1,
            product_id: 3,
            redemption_code: "123456",
        },
        {
            voucher_id: 2,
            status_id: 2,
            product_id: 1,
            redemption_code: "234567",
        },
        {
            voucher_id: 3,
            status_id: 4,
            product_id: 7,
            redemption_code: "345678",
        },
        {
            voucher_id: 4,
            status_id: 3,
            product_id: 5,
            redemption_code: "456789",
        },
        {
            voucher_id: 5,
            status_id: 1,
            product_id: 2,
            redemption_code: "567890",
        },
        {
            voucher_id: 6,
            status_id: 2,
            product_id: 10,
            redemption_code: "678901",
        },
        {
            voucher_id: 7,
            status_id: 1,
            product_id: 4,
            redemption_code: "789012",
        },
        {
            voucher_id: 8,
            status_id: 2,
            product_id: 8,
            redemption_code: "890123",
        },
        {
            voucher_id: 9,
            status_id: 4,
            product_id: 6,
            redemption_code: "901234",
        },
    ])
}

module.exports.readRedeemedVoucherByUser = (req, res, next) => {
    res.status(200).send([
        {
            voucher_id: 1,
            status_id: 1,
            product_id: 3,
            redemption_code: "123456",
        },
        {
            voucher_id: 3,
            status_id: 4,
            product_id: 7,
            redemption_code: "345678",
        },
        {
            voucher_id: 4,
            status_id: 3,
            product_id: 5,
            redemption_code: "456789",
        },
        {
            voucher_id: 5,
            status_id: 1,
            product_id: 2,
            redemption_code: "567890",
        },
        {
            voucher_id: 7,
            status_id: 1,
            product_id: 4,
            redemption_code: "789012",
        },
        {
            voucher_id: 9,
            status_id: 4,
            product_id: 6,
            redemption_code: "901234",
        },
    ])
}

module.exports.readUnredeemedVoucherByUser = (req, res, next) => {
    res.status(200).send([
        {
            voucher_id: 2,
            status_id: 2,
            product_id: 1,
            redemption_code: "234567",
        },
        {
            voucher_id: 6,
            status_id: 2,
            product_id: 10,
            redemption_code: "678901",
        },
        {
            voucher_id: 8,
            status_id: 2,
            product_id: 8,
            redemption_code: "890123",
        },
    ])
}

///////////////
// requests
///////////////
module.exports.readAllRequestByUser = (req, res, next) => {
    res.status(200).send([
        {
            request_id: 1,
            product_id: 3,
            status_id: 1,
            quantity: 2
        },
        {
            request_id: 2,
            product_id: 1,
            status_id: 2,
            quantity: 1
        },
        {
            request_id: 3,
            product_id: 7,
            status_id: 4,
            quantity: 3
        },
        {
            request_id: 4,
            product_id: 5,
            status_id: 3,
            quantity: 5
        },
        {
            request_id: 5,
            product_id: 2,
            status_id: 1,
            quantity: 2
        },
        {
            request_id: 6,
            product_id: 10,
            status_id: 2,
            quantity: 1
        },
        {
            request_id: 7,
            product_id: 4,
            status_id: 1,
            quantity: 4
        },
        {
            request_id: 8,
            product_id: 8,
            status_id: 2,
            quantity: 2
        },
        {
            request_id: 9,
            product_id: 6,
            status_id: 4,
            quantity: 1
        },
    ])
}

module.exports.readPendingRequestByUser = (req, res, next) => {
    res.status(200).send([
        {
            request_id: 2,
            product_id: 1,
            status_id: 2,
            quantity: 1
        },
        {
            request_id: 4,
            product_id: 5,
            status_id: 3,
            quantity: 5
        },
        {
            request_id: 6,
            product_id: 10,
            status_id: 2,
            quantity: 1
        },
        {
            request_id: 8,
            product_id: 8,
            status_id: 2,
            quantity: 2
        },
    ])
}

module.exports.readApprovedRequestByUser = (req, res, next) => {
    res.status(200).send([
        {
            request_id: 1,
            product_id: 3,
            status_id: 1,
            quantity: 2
        },
        {
            request_id: 5,
            product_id: 2,
            status_id: 1,
            quantity: 2
        },
        {
            request_id: 7,
            product_id: 4,
            status_id: 1,
            quantity: 4
        },
    ])
}

module.exports.readRejectedRequestByUser = (req, res, next) => {
    res.status(200).send([
        {
            request_id: 3,
            product_id: 7,
            status_id: 4,
            quantity: 3
        },
        {
            request_id: 9,
            product_id: 6,
            status_id: 4,
            quantity: 1
        },
    ])
}
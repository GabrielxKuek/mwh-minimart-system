const requestModel = require("../models/requestModel.js");

const requestController = {
  getRequest: function (req, res) {
    requestModel
      .getRequestById(req.params.requestId)
      .then((request) => {
        if (!request) {
          return res.status(404).json({ message: "Request not found" });
        }
        res.status(200).json(request);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getAllRequests: function (req, res) {
    requestModel
      .getAllRequests()
      .then((requests) => {
        res.status(200).json(requests);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  approveRequest: function (req, res) {
    requestModel
      .updateRequest(req.params.requestId, { status_id: "approved" })
      .then(() => {
        res.status(200).json({ message: "Request approved" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  rejectRequest: function (req, res) {
    requestModel
      .updateRequest(req.params.requestId, { status_id: "rejected" })
      .then(() => {
        res.status(200).json({ message: "Request rejected" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getUserName: function (req, res) {
    const user_id = req.body.user_id; // Expecting user_id from request body
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log("Fetching user name for ID:", user_id); // Debugging log

    requestModel
      .getUserNameByRef(user_id)
      .then((userName) => {
        if (!userName) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ userName });
      })
      .catch((error) => {
        console.error("Error fetching user name:", error); // Debugging log
        res.status(500).json({ error: error.message });
      });
  },

  getProductName: function (req, res) {
    const product_id = req.body.product_id; // Expecting product_id from request body
    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    console.log("Fetching product name for ID:", product_id); // Debugging log

    requestModel
      .getProductNameByRef(product_id)
      .then((productName) => {
        if (!productName) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ productName });
      })
      .catch((error) => {
        console.error("Error fetching product name:", error); // Debugging log
        res.status(500).json({ error: error.message });
      });
  },
};

module.exports = requestController;
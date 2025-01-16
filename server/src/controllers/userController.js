// import userModel from "../models/userModel.js";

// const userController = {
//   async addNewUser(req, res) {
//     try {
//       const userId = await userModel.addUser(req.body);
//       res.status(201).json({ userId });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async getUser(req, res) {
//     try {
//       const user = await userModel.getUserById(req.params.userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async getAllUsers(req, res) {
//     try {
//       const users = await userModel.getAllUsers();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async updateUser(req, res) {
//     try {
//       await userModel.updateUser(req.params.userId, req.body);
//       res.status(200).json({ message: "User updated successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async suspendUser(req, res) {
//     try {
//       await userModel.updateUser(req.params.userId, { status_id: "suspended" });
//       res.status(200).json({ message: "User suspended" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async reactivateUser(req, res) {
//     try {
//       await userModel.updateUser(req.params.userId, { status_id: "active" });
//       res.status(200).json({ message: "User reactivated" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async findUsers(req, res) {
//     try {
//       const users = await userModel.findUsers(req.query);
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
// };

// export default userController;
const userModel = require("../models/userModel.js");

const userController = {
  addNewUser: function (req, res) {
    userModel
      .addUser(req.body)
      .then((userId) => {
        res.status(201).json({ userId });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getUser: function (req, res) {
    userModel
      .getUserById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getAllUsers: function (req, res) {
    userModel
      .getAllUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  updateUser: function (req, res) {
    userModel
      .updateUser(req.params.userId, req.body)
      .then(() => {
        res.status(200).json({ message: "User updated successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  suspendUser: function (req, res) {
    userModel
      .updateUser(req.params.userId, { status_id: "suspended" })
      .then(() => {
        res.status(200).json({ message: "User suspended" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  reactivateUser: function (req, res) {
    userModel
      .updateUser(req.params.userId, { status_id: "active" })
      .then(() => {
        res.status(200).json({ message: "User reactivated" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  findUsers: function (req, res) {
    userModel
      .findUsers(req.query)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getCurrentPoints: function(req, res) {
    userModel
      .getCurrentPointsByUserId(req.params.userId)
      .then((points) => {
        res.status(200).json({ current_points: points });
      })
      .catch((error) => {
        if (error.message === 'User not found') {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(500).json({ error: error.message });
        }
      });
  }
};

module.exports = userController;

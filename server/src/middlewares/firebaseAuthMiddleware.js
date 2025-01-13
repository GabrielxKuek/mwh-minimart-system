const { getAuth } = require("firebase-admin/auth");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send("Unauthorized");
  }
};

module.exports = authenticate;
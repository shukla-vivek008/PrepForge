const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token.mode");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  const isTokenBlacklisted = await tokenModel.findOne({ token });

  if (isTokenBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  authUser,
};

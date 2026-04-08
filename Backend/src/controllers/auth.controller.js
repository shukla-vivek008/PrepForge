const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tokenModel = require("../models/token.mode.js");

/**
 *
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: newUser._id, user: username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

/**
 * @route POST /api/auth/login
 * @desc Login a user, expexts email and password in the request body
 * @access Public
 */

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User logged In",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * @route POST /api/auth/logout
 * @desc Logout a user by clearing the token cookie and blacklisting the token
 * @access Public
 */

const logoutUserController = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await tokenModel.create({ token });
  }
  res.clearCookie("token");

  res.status(200).json({ message: "User logged out successfully" });
};

/**
 * @route GET /api/auth/me
 * @desc Get the current logged in user's details
 * @access Private
 */
const getCurrentUserController = async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");

  res.status(200).json({
    message: "Current user details",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
};

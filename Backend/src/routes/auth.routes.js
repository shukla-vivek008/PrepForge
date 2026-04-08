const {Router} = require("express");
const authContoller = require("../controllers/auth.controller");
const authMiddelware = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post("/register", authContoller.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password
 * @access Public
 */

authRouter.post("/login", authContoller.loginUserController);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user by blacklisting the authentication cookie
 * @access Public
 */
authRouter.get("/logout", authContoller.logoutUserController);

/**
 * @route GET /api/auth/me
 * @description Get the information of the currently logged-in user
 * @access Private
 */
authRouter.get("/me", authMiddelware.authUser, authContoller.getCurrentUserController);

module.exports = authRouter;
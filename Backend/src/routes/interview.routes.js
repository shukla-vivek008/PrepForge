const express = require("express");
const authMiddelware = require("../middlewares/auth.middleware.js");
const interviewContoller = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description, resume pdf and job description
 * @access private
 */
interviewRouter.post("/", authMiddelware.authUser,upload.single("resume") , interviewContoller.generateInterviewReportContoller);

module.exports = interviewRouter;
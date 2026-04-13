const express = require("express");
const authMiddelware = require("../middlewares/auth.middleware.js");
const interviewController = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description, resume pdf and job description
 * @access private
 */

interviewRouter.post("/", authMiddelware.authUser,upload.single("resume") , interviewController.generateInterviewReportContoller);

/**
 * @route GET /api/interview/
 * @description get all interview report by logged in user
 * @access private
 */

interviewRouter.get("/", authMiddelware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddelware.authUser, interviewController.getInterviewReportByIdController);


/**
 * @route  POST /api/interview/resume/pdf
 * @description generate resume pdf on the basic of user self description, resume content, and job description.
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddelware.authUser, interviewController.generateResumePdfController);


module.exports = interviewRouter;
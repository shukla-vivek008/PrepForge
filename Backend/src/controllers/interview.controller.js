const reportModel = require("../models/report.model.js");
const pdfParse = require("pdf-parse");
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service.js");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function generateInterviewReportContoller(req, res) {

  const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  
  const InterviewReport = await reportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    res.status(201).json({
        message: "Report generated successfully",
        InterviewReport
    });   
}

/**
 * @description Contoller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req,res) {

  const { interviewId } = req.params;

  const interviewReport = await reportModel.findOne({
    _id: interviewId,
    user: req.user.id
  })

  if(!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found"
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully.",
    interviewReport
  });

}

/**
 * @description Controller to get all interview report of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await reportModel.find({
    user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReports
    });
}

/**
 * @description Contoller to generate resume PDF based on user self description, resume and job description
 */
async function generateResumePdfController(req, res) {
  const {interviewReportId} = req.params;

  const interviewReport = await reportModel.findById(interviewReportId);

  if(!interviewReport) {
    return res.status(404).json({
      message:"Interview report not found"
    })
  }

  const {resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({resume, jobDescription, selfDescription});

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
  })

  res.send(pdfBuffer);
}

module.exports = {
  generateInterviewReportContoller,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};

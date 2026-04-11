const reportModel = require("../models/report.model.js");
const pdfParse = require("pdf-parse");
const generateReport = require("../services/ai.service.js");

async function generateInterviewReportContoller(req, res) {

  const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
  const { selfDescription, jobDescription } = req.body;

  const reportByAi = await generateReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  console.log("AI REPORT:", reportByAi);
  
  const report = await reportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...reportByAi,
    });
    res.status(201).json({
        message: "Report generated successfully",
        report
    });   
}
module.exports = {
  generateInterviewReportContoller,
};

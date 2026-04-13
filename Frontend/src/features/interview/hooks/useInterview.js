import {generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf } from '../services/interview.api.js'
import {useContext, useEffect} from 'react'
import { InterviewContext } from '../interview.context.jsx'
import { useParams } from 'react-router'


export const useInterview = () => {

    const context = useContext(InterviewContext);
    const {interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({
                jobDescription, selfDescription, resumeFile
            });

            console.log("FULL RESPONSE:", response);
            setReport(response.InterviewReport)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        return response.InterviewReport;
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let response = null;
        try{
            response = await getInterviewReportById(interviewId);
            setReport(response.InterviewReport);
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
        return response.InterviewReport;
    }

    const getReports = async () => {
        setLoading(true);
        let response = null;
        try{
            response = await getAllInterviewReports();
            setReports(response.InterviewReport)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        return response.InterviewReports;
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateResumePdf({interviewReportId})
            const url = window.createObjectURL(new Blob([response], {type: "application/pdf"}))
            const link = document.createElement("a")
            link.href = url;
            link.setAttribute("download", `resume_${interviewReportId}.pdf`);
            document.body.appendChild(link)
            link.clink()
        } catch (err) {
            console.log(err);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=> {
        if(interviewId) {
            getReportById(interviewId);
        } else {
            getReports()
        }
    },[ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }
}

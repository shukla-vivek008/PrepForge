const { GoogleGenAI } = require("@google/genai");
const { z, config } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const reportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe.",
    ),
  technicalQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe(
            "The technical question that can be ask during the interview",
          ),
        intention: z
          .string()
          .describe("The intention behind asking this question"),
        answer: z
          .string()
          .describe(
            " How to answer this question, what points to cover, what approach to take, etc.",
          ),
      })
      .describe(
        "Technical question that can be ask during the interview along with the intention and how to answer them",
      ),
  ),
  behavioralQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe(
            "The behavioral question that can be ask during the interview",
          ),
        intention: z
          .string()
          .describe("The intention behind asking this question"),
        answer: z
          .string()
          .describe(
            " How to answer this question, what points to cover, what approach to take, etc.",
          ),
      })
      .describe(
        "Behavioral question that can be ask during the interview along with the intention and how to answer them",
      ),
  ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      }),
    )
    .describe(
      "List of skill gaps that the candidate has along with the severity.",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number of the preparation plan, starting from 1."),
        focus: z
          .string()
          .describe(
            "The main focus of that day, e.g., 'Data Structures', 'System Design', 'Behavioral Questions', etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the prepration plan, e.g., read a specific chapter, solve a set of problems, mock interview, etc.",
          ),
      }),
    )
    .describe(
      "The Day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.",
    ),
});

async function generateReport({ resume, selfDescription, jobDescription }) {
  const prompt = `
Return ONLY valid JSON. No explanation.

Follow EXACT structure:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low | medium | high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": "",
      "tasks": ["", ""]
    }
  ]
}

IMPORTANT:
- technicalQuestions MUST be array of objects (NOT strings)
- behavioralQuestions MUST be array of objects
- skillGaps MUST be array of objects
- preparationPlan MUST be array of objects

Generate:
- 5 technical questions
- 3 behavioral questions
- 3 skill gaps
- 5-day plan

Candidate:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
    },
  });

  let text = response.text || "";

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Bad AI JSON:", text);

    return {
      matchScore: 0,
      technicalQuestions: [],
      behavioralQuestions: [],
      skillGaps: [],
      preparationPlan: [],
    };
  }
}

module.exports = generateReport;

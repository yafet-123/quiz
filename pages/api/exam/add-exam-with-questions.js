// pages/api/exam/add-exam-with-questions.js
import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subjectId, title, questions, createdBy } = req.body;

  if (!subjectId || !title || !questions || !createdBy || questions.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  console.log(questions)
  try {
    // Ensure all questions have an answer
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].correctOption) {
        return res.status(400).json({
          message: `Question ${i + 1} is missing the correct answer.`,
        });
      }
      if (!questions[i].Options || questions[i].Options.length === 0) {
        return res.status(400).json({
          message: `Question ${i + 1} must have at least one option.`,
        });
      }
    }

    console.log(questions[0].Options)

    const newExam = await prisma.Exam.create({
      data: {
        title,
        Subject: {
          connect: { id: parseInt(subjectId) },
        },
        User: {
          connect: { id: parseInt(createdBy) }, // ✅ connect user
        },
        Questions: {
          create: questions.map((q) => ({
            question: q.question,
            correctAnswer: q.correctOption,
            Options: {
              create: (q.Options?.create || []).map((opt) => ({
                optionText: opt.optionText || opt,
              })),
            },
          })),
        },
      },
      include: {
        Questions: {
          include: { Options: true },
        },
      },
    });


    return res.status(200).json({
      message: "Exam and questions created successfully",
      data: newExam,
    });
  } catch (error) {
    console.error("Error adding exam:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

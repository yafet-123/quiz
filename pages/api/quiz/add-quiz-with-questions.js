// pages/api/quiz/add-quiz-with-questions.js
import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subjectId, title, questions } = req.body;

  if (!subjectId || !title || !questions || questions.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Ensure all questions have an answer
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].answer) {
        return res.status(400).json({
          message: `Question ${i + 1} is missing the correct answer.`,
        });
      }
    }

    // Create the quiz with questions and options
    const newQuiz = await prisma.quiz.create({
      data: {
        subjectId: parseInt(subjectId),
        title: title,
        Questions: {
          create: questions, // directly use what frontend sent
        },
      },
      include: {
        Questions: {
          include: { Options: true },
        },
      },
    });

    return res.status(200).json({
      message: "Quiz and questions created successfully",
      data: newQuiz,
    });
  } catch (error) {
    console.error("Error adding quiz:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

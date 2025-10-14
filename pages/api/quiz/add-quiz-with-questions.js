// pages/api/quiz/add-quiz-with-questions.js

import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subjectId, quizTitle, questions } = req.body;

  if (!subjectId || !quizTitle || !questions || questions.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create the quiz first
    const newQuiz = await prisma.quiz.create({
      data: {
        subjectId: parseInt(subjectId),
        title: quizTitle,
        Questions: {
          create: questions.map((q) => ({
            question: q.question,
            answer: q.answer,
          })),
        },
      },
      include: {
        Questions: true, // optional, returns the created questions
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

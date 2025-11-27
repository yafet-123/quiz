import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subjectId, title, questions } = req.body;

  if (!questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: "Questions must be an array" });
  }

  try {
    const quizId = parseInt(id);

    // 1️⃣ DELETE all existing option rows
    await prisma.optionTable.deleteMany({
      where: {
        Question: {
          quizId: quizId,
        },
      },
    });

    // 2️⃣ DELETE all existing questions
    await prisma.question.deleteMany({
      where: { quizId: quizId },
    });

    // 3️⃣ UPDATE quiz + recreate questions + options
    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        title,
        subjectId: parseInt(subjectId),

        Questions: {
          create: questions.map((q) => ({
            question: q.question,
            answer: q.answer,

            OptionTable: {
              create: q.Options.create.map((opt) => ({
                optionText: opt.optionText,
              })),
            },
          })),
        },
      },

      include: {
        Questions: {
          include: {
            OptionTable: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Quiz updated successfully",
      updatedQuiz,
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update quiz" });
  }
}

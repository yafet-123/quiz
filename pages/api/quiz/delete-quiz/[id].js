import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const quizId = parseInt(id);

    // 1️⃣ Delete all options for questions in this quiz
    await prisma.optionTable.deleteMany({
      where: {
        Question: {
          quizId: quizId,
        },
      },
    });

    // 2️⃣ Delete all questions for this quiz
    await prisma.question.deleteMany({
      where: {
        quizId: quizId,
      },
    });

    // 3️⃣ Delete the quiz
    await prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
}

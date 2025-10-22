import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "PATCH") return res.status(405).json({ error: "Method not allowed" });

  const { title, subjectId, questions } = req.body;
  console.log(req.body)
  try {
    // Delete old questions and options, then create new ones
    const updatedQuiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: {
        title,
        subjectId: parseInt(subjectId),
        Questions: {
          deleteMany: {},
          create: questions.map((q) => ({
            question: q.question,
            answer: q.answer,
            Options: { create: q.Options.create.map((opt) => ({ optionText: opt.optionText })) },
          })),
        },
      },
      include: { Questions: { include: { Options: true } } },
    });

    res.status(200).json({ message: "Quiz updated successfully", updatedQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update quiz" });
  }
}

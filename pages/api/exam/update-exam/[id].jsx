import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(id)
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subjectId, title, questions } = req.body;

  try { 
    const examId = parseInt(id);

    // 1️⃣ Delete ALL existing option rows first
    await prisma.ExamOption.deleteMany({
      where: {
        ExamQuestion: {
          examId: examId,
        },
      },
    });

    // 2️⃣ Delete ALL existing questions
    await prisma.ExamQuestion.deleteMany({
      where: { examId: examId },
    });

    // Then update the exam
    const updatedExam = await prisma.Exam.update({
      where: { id: parseInt(id) },
      data: {
        title,
        subjectId: parseInt(subjectId),
        Questions: {
          create: questions.map((q) => ({
            question: q.question,
            correctAnswer: q.correctOption,
            Options: {
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
            Options: true,
          },
        },
      },
    });


    res.status(200).json({
      message: "Exam updated successfully",
      updatedExam,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: "Failed to update exam" });
  }
}

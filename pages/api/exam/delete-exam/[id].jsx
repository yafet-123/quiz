import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const examId = parseInt(id);

    // 1️⃣ Delete all options related to this exam
    await prisma.ExamOption.deleteMany({
      where: {
        ExamQuestion: {
          examId: examId,
        },
      },
    });

    // 2️⃣ Delete all questions for this exam
    await prisma.ExamQuestion.deleteMany({
      where: {
        examId: examId,
      },
    });

    // 3️⃣ Delete the exam itself
    await prisma.Exam.delete({
      where: {
        id: examId,
      },
    });

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ error: "Failed to delete exam" });
  }
}

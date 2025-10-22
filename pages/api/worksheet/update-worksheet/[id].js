import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subjectId, title, questions } = req.body;
  console.log(id)
  try {
    // ✅ Update exam and replace its questions/options
    // First manually delete old options and questions
    await prisma.WorksheetQuestion.deleteMany({
      where: { worksheetId: parseInt(id) },
    });

    // Then update the exam
    const updatedWorksheet = await prisma.Worksheet.update({
      where: { id: parseInt(id) },
      data: {
        title,
        subjectId: parseInt(subjectId),
        Questions: {
          create: questions.map((q) => ({
            question: q.question,
            correctAnswer: q.correctAnswer,
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
      message: "Worksheet updated successfully",
      updatedWorksheet,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: "Failed to update Worksheet" });
  }
}

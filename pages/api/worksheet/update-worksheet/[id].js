import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const worksheetId = parseInt(id);
    const { title, subjectId, questions } = req.body;

    // 1️⃣ Delete all options
    await prisma.worksheetOption.deleteMany({
      where: {
        WorksheetQuestion: {
          worksheetId: worksheetId,
        },
      },
    });

    // 2️⃣ Delete all questions
    await prisma.worksheetQuestion.deleteMany({
      where: {
        worksheetId: worksheetId,
      },
    });

    // 3️⃣ Update worksheet and recreate questions/options
    const updatedWorksheet = await prisma.worksheet.update({
      where: { id: worksheetId },
      data: {
        title,
        subjectId: parseInt(subjectId),
        Questions: {
          create: questions.map((q) => ({
            question: q.question,
            correctAnswer: q.correctAnswer,  // from your front-end field
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
    console.error("Error updating worksheet:", error);
    res.status(500).json({ error: "Failed to update worksheet" });
  }
}

import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { subjectId, examTitle, questions } = req.body;

  if (!subjectId || !examTitle || !questions?.length)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const exam = await prisma.exam.create({
      data: {
        title: examTitle,
        subjectId: parseInt(subjectId),
        Questions: {
          create: questions.map((q) => ({
            question: q.question,
            correctOption: q.correctOption,
            Options: {
              create: q.options.map((opt) => ({ optionText: opt })),
            },
          })),
        },
      },
      include: { Questions: { include: { Options: true } } },
    });

    res.status(200).json({ message: "Exam created successfully", data: exam });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

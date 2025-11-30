import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } }; // allow normal body parser

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { subjectId, topicTitle, books } = req.body;

    if (!subjectId || !topicTitle || !books || books.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    for (const book of books) {
      // Save book in DB
      const exam = await prisma.examPreparation.create({
        data: {
          nameOfBook: book.name,
          bookFile: book.link, // <— now storing link directly
          subjectId: parseInt(subjectId),
        },
      });

      // Save topic entry
      await prisma.examPreparationTopic.create({
        data: {
          title: topicTitle,
          examPrepId: exam.id,
        },
      });
    }

    return res.json({ message: "Saved successfully!" });

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}

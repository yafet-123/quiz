import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

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
      const savedBook = await prisma.book.create({
        data: {
          title: book.name,
          bookFile: book.link,
          subjectId: parseInt(subjectId),
        },
      });

      // Save topic entry
      await prisma.bookTopic.create({
        data: {
          title: topicTitle,
          bookId: savedBook.id,
        },
      });
    }

    return res.json({ message: "Books saved successfully!" });

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}

import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

        const { subjectId, categoryTitle, books } = req.body;

    if (!subjectId || !categoryTitle || !books || books.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save category entry
    const savedCategory = await prisma.bookCategory.create({
      data: {
        title: categoryTitle,
        subjectId: parseInt(subjectId),
      },
    });

    for (const book of books) {
      // Save book in DB
      await prisma.book.create({
        data: {
          title: book.name,
          bookFile: book.link,
          subjectId: parseInt(subjectId),
          categoryId: savedCategory.id,
        },
      });
    }

    return res.json({ message: "Books saved successfully!" });

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}

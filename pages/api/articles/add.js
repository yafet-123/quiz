import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subjectId, title, slug, content, createdBy } = req.body;

  if (!subjectId || !title || !slug || !content || !createdBy) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // ✅ Check if slug already exists
    const existing = await prisma.Article.findUnique({
      where: { slug },
    });

    if (existing) {
      return res.status(409).json({ error: "Slug already exists." });
    }

    // ✅ Create article
    const article = await prisma.Article.create({
      data: {
        subjectId: Number(subjectId),
        title,
        slug,
        content,
        createdBy: Number(createdBy),
      },
    });

    return res.status(201).json({ message: "Article added successfully.", article });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to add article." });
  }
}

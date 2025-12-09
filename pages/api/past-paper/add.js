import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { subjectId, topicTitle, papers } = req.body;

    if (!subjectId || !topicTitle || !papers || papers.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    for (const paper of papers) {
      // Save past paper in DB
      const pastPaper = await prisma.pastPaper.create({
        data: {
          title: paper.name,
          paperFile: paper.link,
          year: paper.year ? parseInt(paper.year) : null,
          subjectId: parseInt(subjectId),
        },
      });

      // Save topic entry
      await prisma.pastPaperTopic.create({
        data: {
          title: topicTitle,
          pastPaperId: pastPaper.id,
        },
      });
    }

    return res.json({ message: "Past papers saved successfully!" });

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}

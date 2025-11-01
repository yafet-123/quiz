import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const announcement = await prisma.announcement.create({
        data: {
          title,
          content,
          authorId,
        },
      });
      res.status(200).json(announcement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create announcement" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

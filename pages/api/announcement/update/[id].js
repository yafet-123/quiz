import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { title, content } = req.body;

    try {
      const announcement = await prisma.announcement.update({
        where: { id: parseInt(id) },
        data: { title, content },
      });
      res.status(200).json(announcement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update announcement" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.announcement.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ message: "Announcement deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete announcement" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

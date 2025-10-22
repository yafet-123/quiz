import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ error: "Failed to delete exam" });
  }
}

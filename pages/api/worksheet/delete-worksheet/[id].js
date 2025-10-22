import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await prisma.Worksheet.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Worksheet deleted successfully" });
  } catch (error) {
    console.error("Error deleting Worksheet:", error);
    res.status(500).json({ error: "Failed to delete Worksheet" });
  }
}


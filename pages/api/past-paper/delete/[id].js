import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;
    const paperId = parseInt(id);
    
    await prisma.pastPaper.delete({
      where: { id: paperId },
    });

    return res.status(200).json({
      success: true,
      message: "Past paper deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete Past Paper",
    });
  }
}

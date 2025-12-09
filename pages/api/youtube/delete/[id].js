import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;
    const youtubeId = parseInt(id);
    
    await prisma.youtubeLink.delete({
      where: { id: youtubeId },
    });

    return res.status(200).json({
      success: true,
      message: "YouTube link deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete YouTube link",
    });
  }
}

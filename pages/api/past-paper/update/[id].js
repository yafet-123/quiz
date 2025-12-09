import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { subjectId, title, paperFileLink, year } = req.body;

    // Validate inputs
    if (!subjectId || !title || !paperFileLink) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedPastPaper = await prisma.pastPaper.update({
      where: { id: parseInt(id) },
      data: {
        subjectId: parseInt(subjectId),
        title,
        paperFile: paperFileLink,
        year: year ? parseInt(year) : null,
      },
    });

    return res.status(200).json({
      message: "Past Paper updated successfully",
      pastPaper: updatedPastPaper,
    });

  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({ message: "Failed to update Past Paper" });
  }
}

import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const worksheetId = parseInt(id);

    // 1️⃣ Delete all options for questions in this worksheet
    await prisma.worksheetOption.deleteMany({
      where: {
        WorksheetQuestion: {
          worksheetId: worksheetId,
        },
      },
    });

    // 2️⃣ Delete all questions for this worksheet
    await prisma.worksheetQuestion.deleteMany({
      where: {
        worksheetId: worksheetId,
      },
    });

    // 3️⃣ Delete the worksheet itself
    await prisma.worksheet.delete({
      where: {
        id: worksheetId,
      },
    });

    res.status(200).json({ message: "Worksheet deleted successfully" });
  } catch (error) {
    console.error("Error deleting worksheet:", error);
    res.status(500).json({ error: "Failed to delete worksheet" });
  }
}

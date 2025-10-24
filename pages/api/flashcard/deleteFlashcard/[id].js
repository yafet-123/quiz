// pages/api/flashcard/deleteFlashcard/[id].js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // get flashcard id from URL

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Delete the flashcard
    const deletedFlashcard = await prisma.flashcard.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Flashcard deleted successfully", data: deletedFlashcard });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ message: "Failed to delete flashcard", error: error.message });
  }
}

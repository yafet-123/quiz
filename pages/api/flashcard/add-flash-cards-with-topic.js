// pages/api/flashcard/add-flash-cards-with-topic.js

import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subjectId, topicTitle, flashcards } = req.body;

  if (!subjectId || !topicTitle || !flashcards || flashcards.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create the flashcard topic first
    const newTopic = await prisma.flashcardTopic.create({
      data: {
        subjectId: parseInt(subjectId),
        title: topicTitle,
        Flashcards: {
          create: flashcards.map((fc) => ({
            term: fc.term,
            definition: fc.definition,
          })),
        },
      },
      include: {
        Flashcards: true, // optional, returns the created flashcards
      },
    });

    return res.status(200).json({
      message: "Flashcard topic and flashcards created successfully",
      data: newTopic,
    });
  } catch (error) {
    console.error("Error adding flashcards:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

import { prisma } from "../../../util/db.server.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subjectId, topicId, title, definitions } = req.body;

  if (!subjectId || !title || !definitions || definitions.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let topic;

    if (topicId && !isNaN(parseInt(topicId))) {
      // Add flashcards to existing topic
      topic = await prisma.flashcardTopic.update({
        where: { id: parseInt(topicId) },
        data: {
          Flashcards: {
            create: definitions.map((def) => ({
              term: def.term,
              definition: def.meaning,
            })),
          },
        },
        include: { Flashcards: true },
      });
    } else {
      // Create new topic with flashcards
      topic = await prisma.flashcardTopic.create({
        data: {
          subjectId: parseInt(subjectId),
          title,
          Flashcards: {
            create: definitions.map((def) => ({
              term: def.term,
              definition: def.meaning,
            })),
          },
        },
        include: { Flashcards: true },
      });
    }

    return res.status(200).json({
      message: "Flashcards added successfully",
      data: topic,
    });
  } catch (error) {
    console.error("Error adding flashcards:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

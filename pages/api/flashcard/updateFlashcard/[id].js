import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const flashcardId = parseInt(req.query.id);
  console.log(flashcardId)
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { selectedSubject, topicTitle, updateterm, updatedefinition } = req.body;
  console.log(req.body)
  try {
    // 1️⃣ Find or create the topic
    let topic = await prisma.flashcardTopic.findFirst({
      where: {
        title: topicTitle,
        subjectId: Number(selectedSubject),
      },
    });

    if (!topic) {
      topic = await prisma.flashcardTopic.create({
        data: {
          title: topicTitle,
          subjectId: Number(selectedSubject),
        },
      });
    }

    // 2️⃣ Update the flashcard
    const updatedFlashcard = await prisma.flashcard.update({
      where: { id: flashcardId },
      data: {
        term: updateterm,
        definition: updatedefinition,
        topicId: topic.id,
      },
    });

    res.status(200).json({ message: "Flashcard updated successfully", flashcard: updatedFlashcard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update flashcard", error });
  }
}

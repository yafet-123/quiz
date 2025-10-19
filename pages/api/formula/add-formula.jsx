import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subjectId, topicName, formulas, createdBy } = req.body;

  if (!subjectId || !topicName || !formulas || formulas.length === 0 || !createdBy) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  console.log(req.body)
  try {
    // Step 1: Create Topic first
    const newTopic = await prisma.topic.create({
      data: {
        name: topicName,
        subjectId: parseInt(subjectId),
      },
    });
    console.log(newTopic)
    // Step 2: Create formulas under the new Topic
    const createdFormulas = await Promise.all(
      formulas.map((f) =>
        prisma.formulaSheet.create({
          data: {
            title: f.title,
            description: f.description || "",
            formula: f.formula,
            topicId: newTopic.id,
            subjectId: parseInt(subjectId),
            createdBy: parseInt(createdBy),
          },
        })
      )
    );

    return res.status(200).json({
      message: "Topic and formulas created successfully",
      topic: newTopic,
      formulas: createdFormulas,
    });
  } catch (error) {
    console.error("Error creating topic and formulas:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

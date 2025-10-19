// pages/api/definitionSheet/add.js

import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log(req.body)
  const { title, description, subjectId, createdBy, definitions } = req.body;

  if (
    !title ||
    !subjectId ||
    !createdBy ||
    !definitions ||
    definitions.length === 0
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newSheet = await prisma.definitionSheet.create({
      data: {
        title,
        description,
        subjectId: parseInt(subjectId),
        createdBy: parseInt(createdBy),
        Definitions: {
          create: definitions.map((def) => ({
            term: def.term,
            meaning: def.meaning,
            example: def.example || "",
          })),
        },
      },
      include: {
        Definitions: true, // returns the created definitions
      },
    });

    return res.status(200).json({
      message: "Definition Sheet created successfully",
      data: newSheet,
    });
  } catch (error) {
    console.error("Error adding definition sheet:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

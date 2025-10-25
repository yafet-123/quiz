import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const sheetId = parseInt(req.query.id);

  if (req.method === "PATCH") {
    const { title, description, subjectId, definitions } = req.body;

    try {
      // Update sheet
      await prisma.definitionSheet.update({
        where: { id: sheetId },
        data: {
          title,
          description,
          subjectId,
        },
      });

      // Update definitions
      for (const def of definitions) {
        if (def.id) {
          // existing definition
          await prisma.definition.update({
            where: { id: def.id },
            data: { term: def.term, meaning: def.meaning, example: def.example },
          });
        } else {
          // new definition
          await prisma.definition.create({
            data: {
              term: def.term,
              meaning: def.meaning,
              example: def.example,
              sheetId: sheetId,
            },
          });
        }
      }

      res.status(200).json({ message: "Definition sheet updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update sheet" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

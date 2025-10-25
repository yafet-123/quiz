import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const sheetId = parseInt(req.query.id);

  if (req.method === "DELETE") {
    try {
      await prisma.definition.deleteMany({ where: { sheetId } });
      await prisma.definitionSheet.delete({ where: { id: sheetId } });
      res.status(200).json({ message: "Definition sheet deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete sheet" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

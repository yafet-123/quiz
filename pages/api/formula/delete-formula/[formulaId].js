import { prisma } from '../../../../util/db.server.js'


export default async function handler(req, res) {
  const { formulaId } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.formulaSheet.delete({
        where: { id: Number(formulaId) },
      });
      res.status(200).json({ success: true, message: "Formula sheet deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete formula sheet" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

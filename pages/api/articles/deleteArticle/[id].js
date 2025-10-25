import { prisma } from '../../../../util/db.server.js'


export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.article.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Article deleted successfully." });
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ message: "Failed to delete article." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    try {
      const { title, slug, content,subjectId } = req.body;
      console.log(req.body)
      const updatedArticle = await prisma.article.update({
        where: { id: Number(id) },
        data: { title, slug, content, subjectId : parseInt(subjectId) },
      });

      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error("Error updating article:", error);
      res.status(500).json({ message: "Failed to update article." });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

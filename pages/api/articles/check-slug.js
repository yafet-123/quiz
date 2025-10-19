import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug is required." });
  }

  try {
    const exists = await prisma.Article.findUnique({
      where: { slug },
    });

    return res.status(200).json({ exists: !!exists });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error checking slug." });
  }
}

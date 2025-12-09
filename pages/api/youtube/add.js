import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { subjectId, topicTitle, videos } = req.body;

    if (!subjectId || !topicTitle || !videos || videos.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    for (const video of videos) {
      // Save youtube link in DB
      const youtubeLink = await prisma.youtubeLink.create({
        data: {
          title: video.name,
          url: video.link,
          subjectId: parseInt(subjectId),
        },
      });

      // Save topic entry
      await prisma.youtubeLinkTopic.create({
        data: {
          title: topicTitle,
          youtubeLinkId: youtubeLink.id,
        },
      });
    }

    return res.json({ message: "YouTube links saved successfully!" });

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}

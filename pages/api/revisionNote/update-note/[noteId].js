// /pages/api/notes/update-note/[noteId].js
import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { noteId } = req.query;
  console.log(req.query)
  if (req.method === "PATCH") {
    const { title, subjectId, content } = req.body;
    console.log(req.body)
    if (!title || !subjectId || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const updatedNote = await prisma.RevisionNote.update({
        where: { id: Number(noteId) },
        data: { title, subjectId: Number(subjectId), content },
      });
      res.status(200).json({ success: true, data: updatedNote });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update note" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

// /pages/api/notes/delete-note/[noteId].js
import { prisma } from "../../../../util/db.server.js";

export default async function handler(req, res) {
  const { noteId } = req.query;
  console.log(req.query)
  if (req.method === "DELETE") {
    try {
      await prisma.RevisionNote.delete({ where: { id: Number(noteId) } });
      res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete note" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
 
import { prisma } from '../../../util/db.server.js';

export default async function handleAddNote(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { subjectId, title, content, createdBy } = req.body;

    if (!subjectId || !title || !content || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const note = await prisma.Note.create({
      data: {
        title,
        content,
        subjectId: Number(subjectId),
        createdBy: Number(createdBy), // ✅ ensure it's a number
      },
    });

    res.status(200).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

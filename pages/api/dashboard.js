// /pages/api/dashboard.js
import { prisma } from '../../util/db.server.js'

export default async function handler(req, res) {
  try {
    const users = await prisma.User.count(); 
    const subjects = await prisma.Subject.count();
    const notes = await prisma.Note.count();
    const exams = await prisma.Exam.count();

    const stats = { users, subjects, notes, exams };

    const chartData = [
      { name: "Users", count: users },
      { name: "Subjects", count: subjects },
      { name: "Notes", count: notes },
      { name: "Exams", count: exams },
    ];

    res.status(200).json({ stats, chartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

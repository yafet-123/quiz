import { prisma } from '../../util/db.server.js'

export default async function handler(req, res) {
  try {
    const users = await prisma.user.count()
    const subjects = await prisma.subject.count()
    const notes = await prisma.note.count()
    const exams = await prisma.exam.count()

    console.log(subjects)

    const stats = { users, subjects, notes, exams }
    const chartData = [
      { name: "Users", number: users },
      { name: "Subjects", number: subjects },
      { name: "Notes", number: notes },
      { name: "Exams", number: exams },
    ]

    res.status(200).json({ stats, chartData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

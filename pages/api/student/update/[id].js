import { prisma } from '../../../../util/db.server.js'

export default async function handler(req, res) {
  const studentId = parseInt(req.query.id);

  if (req.method === "PATCH") {
    const { name, email, gradeLevel, schoolName, dateOfBirth, gender } = req.body;
    console.log(req.body)
    try {
      const updatedStudent = await prisma.Student.update({
        where: { id: studentId },
        data: {
          name,
          email,
          gradeLevel,
          schoolName,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
        },
      });

      res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update student", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
  const studentId = parseInt(req.query.id);

  if (req.method === 'PATCH') {
    const { name, schoolName, dateOfBirth, gender, email } = req.body;

    try {
      const updatedStudent = await prisma.Student.update({
        where: { id: studentId },
        data: {
          name,
          schoolName,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
          email,
        },
      });
      return res.status(200).json({ success: true, student: updatedStudent });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Failed to update student.' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }
}
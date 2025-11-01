import { prisma } from '../../../util/db.server.js'
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password, confirmPassword, gradeLevel, schoolName, dateOfBirth, gender } = req.body;

  // 1. Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // 2. Password strength validation (optional)
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // 3. Check if email already exists
    const existingStudent = await prisma.student.findUnique({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the student
    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gradeLevel,
        schoolName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        role: "student",
      },
    });

    res.status(200).json({ message: "Student account created successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

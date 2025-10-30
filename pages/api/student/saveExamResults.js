import nodemailer from "nodemailer";
import { prisma } from '../../../util/db.server.js'

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { studentId, examId, email, answers } = req.body;

  try {
    // Save each answer individually in StudentExamAnswer table
    const createPromises = answers.map((a) =>
      prisma.StudentExamAnswer.create({
        data: {
          studentId: Number(studentId),
          examId: Number(examId),
          question: a.question,
          selectedAnswer: a.selectedAnswer || null,
          correctAnswer: a.correctAnswer,
        },
      })
    );

    await Promise.all(createPromises);

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: `Exam Submission: Exam ID ${examId}`,
      html: `
        <h2>Your exam has been submitted successfully!</h2>
        <p>Student ID: ${studentId}</p>
        <p>Exam ID: ${examId}</p>
        <p>Answers submitted:</p>
        <ul>
          ${answers
            .map(
              (a, i) =>
                `<li><strong>Q${i + 1}:</strong> ${a.question}<br/>
                 <strong>Your answer:</strong> ${a.selectedAnswer || "Not answered"}<br/>
                 <strong>Correct answer:</strong> ${a.correctAnswer}</li>`
            )
            .join("")}
        </ul>
        <p>Thank you for completing your exam.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Exam results saved and email sent successfully." });
  } catch (error) {
    console.error("Error saving exam results or sending email:", error);
    res.status(500).json({ message: "Failed to save exam results or send email." });
  }
}

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { name, email, phone, message } = await req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "MatricMate@gmail.com",
      pass: "mkhvelqnhlpkznji",
    },
  });
 
  // Define the email options
  const mailOptions = {
    from: "MatricMate@gmail.com",
    to: "yafetaddisu123@gmail.com",
    subject: "New Contact Form Submission From HelenZeray.com",
    text: `Name: ${name} \nEmail: ${email} \nphone: ${phone} \nMessage: ${message}`,
  };
  console.log(mailOptions);
  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(405).end(); // Method Not Allowed
  }
}

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { name, email, phone, message } = await req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
 
  // Define the email options
  const mailOptions = {
    from: "addisuyafet321@gmail.com",
    to: "yafetaddisu123@gmail.com",
    subject: "New Contact Form Submission",
    html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong><br/> ${message}</p>
        `,
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

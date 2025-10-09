import { prisma } from '../../util/db.server.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddlogin(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("Please provide all values");
    }

    const user = await prisma.Students.findUnique({
      where: {
        UserName: username,
      },
    });
    console.log(user)
    if (!user) {
      throw new Error(`No ${username} can be found`);
    }

    const comparePassword = async function (candidatePassword) {
      const isMatch = await bcrypt.compare(candidatePassword, user.Password);
      return isMatch;
    };

    const isPasswordCorrect = await comparePassword(password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid");
    }

    const createJWT = jwt.sign(
      { userId: user.students_id, user: user.UserName },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    const token = createJWT;

    res.status(StatusCodes.OK).json({
      userId: user.students_id,
      name: user.UserName,
      role: user.role,
      email: user.email,
      class_id: user.class_id,
      token,
    });
  } catch (error) {
    // Handle the error and redirect to the error page
    console.error('Error:', error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect('/auth/error-student'); // Adjust the error page URL as needed
  }
}

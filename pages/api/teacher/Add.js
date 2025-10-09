import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleadduser(req, res){
	const {UserName , Password, email, role} = req.body;
	console.log(UserName)
	const data = await prisma.Teacher.create({
		data:{
			UserName,
			email,
			Password:bcrypt.hashSync(Password, 8),
			role
		},
	});

	// take the username and password and save it , the password is bcrypt
  	const token = jwt.sign(
    	{ userId: data.teacher_id, user: data.UserName },process.env.JWT_SECRET,
    		{expiresIn: process.env.JWT_LIFETIME,}
  	);
  

  	res.status(StatusCodes.CREATED).json({
    	data: {
      		userId: data.teacher_id,
    		user: data.UserName,
    	},
    	token,
  	});
	
}


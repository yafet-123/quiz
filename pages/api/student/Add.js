import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
 
export default async function handleadduser(req, res){
	const {UserName, firstName, lastName , Password,class_id, email, role} = req.body;
	console.log(req.body)
	const data = await prisma.Students.create({
		data:{
			UserName,
			firstName,
			lastName,
			email,
			Password:bcrypt.hashSync(Password, 8),
			class_id:Number(class_id),
			role
		},
	});

	// take the username and password and save it , the password is bcrypt
  	const token = jwt.sign(
    	{ userId: data.students_id, user: data.UserName },process.env.JWT_SECRET,
    		{expiresIn: process.env.JWT_LIFETIME,}
  	);
  

  	res.status(StatusCodes.CREATED).json({
    	data: {
      		userId: data.students_id,
    		user: data.UserName,
    	},
    	token,
  	});
	
}


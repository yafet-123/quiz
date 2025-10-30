import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
 
export default async function handleadduser(req, res){
	const {text ,completed ,students_id} = req.body;
	console.log(req.body)
	const data = await prisma.Task.create({
		data:{
			text,
			completed,
			students_id
		},
	});
	console.log(data)
	res.json("Success")
}

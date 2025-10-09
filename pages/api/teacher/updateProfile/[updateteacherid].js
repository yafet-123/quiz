import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateteacherid} = req.query
	const {firstName,lastName,age,UserName,email} = req.body
	const data = await prisma.Teacher.update({
		where:{teacher_id:Number(updateteacherid)},
		data:{
			firstName,
			lastName,
			age:Number(age),
			UserName,
			email
		},
	});
	res.json(data)
}
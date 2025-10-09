import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateuserid} = req.query
	const {UserName,email} = req.body
	const data = await prisma.Students.update({
		where:{students_id:Number(updateuserid)},
		data:{
			UserName,
			email
		},
	});
	res.json(data)
}
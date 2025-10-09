import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res){
	const {deleteassignid} = req.query
	console.log(req.query)
	const data = await prisma.ClassTeacher.delete({
		where:{teacher_class_id:Number(deleteassignid)},
	});
	res.json(data)
}
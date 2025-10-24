import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {subjectid} = req.query
	const {subjectname ,subjectdescreption ,subjectsvg} = req.body
	const data = await prisma.Subject.update({
		where:{id:Number(subjectid)},
		data:{
			name:subjectname,
			description:subjectdescreption,
			svg:subjectsvg,
		},
	});
	res.json(data)
}
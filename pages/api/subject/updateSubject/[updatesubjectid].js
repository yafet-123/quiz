import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updatesubjectid} = req.query
	const {SubjectName} = req.body
	const data = await prisma.Subject.update({
		where:{subject_id:Number(updatesubjectid)},
		data:{
			SubjectName
		},
	});
	res.json(data)
}
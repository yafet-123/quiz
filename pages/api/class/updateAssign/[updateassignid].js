import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateassignid} = req.query
	const {updateclassId,updatesubjectid} = req.body
	const data = await prisma.ClassSubject.update({
		where:{class_subject_id:Number(updateassignid)},
		data:{
			class_id:Number(updateclassId),
			subject_id:Number(updatesubjectid)
			
		},
	});
	res.json(data)
}
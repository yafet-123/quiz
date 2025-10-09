import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateassignid} = req.query
	const {updateuserid,updateclassid,updatesubjectid} = req.body
	const data = await prisma.ClassTeacher.update({
		where:{teacher_class_id:Number(updateassignid)},
		data:{
			class_id:Number(updateclassid),
			teacher_id:Number(updateuserid),
			subject_id:Number(updatesubjectid)
			
		},
	});
	res.json(data)
}
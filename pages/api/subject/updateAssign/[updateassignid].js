import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateassignid} = req.query
	const {updatequestioncategoryid,updatesubjectid} = req.body
	const data = await prisma.SubjectQuestionCategory.update({
		where:{subject_category_id:Number(updateassignid)},
		data:{
			question_category_id:Number(updatequestioncategoryid),
			subject_id:Number(updatesubjectid)
			
		},
	});
	res.json(data)
}
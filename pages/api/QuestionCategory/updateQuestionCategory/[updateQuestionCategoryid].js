import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updateQuestionCategoryid} = req.query
	const {questioncategoryName} = req.body
	const data = await prisma.QuestionCategory.update({
		where:{question_category_id:Number(updateQuestionCategoryid)},
		data:{
			questioncategoryName
		},
	});
	res.json(data)
}
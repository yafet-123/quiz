import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deleteQuestionCategoryid} = req.query
	console.log(req.query)
	const data = await prisma.QuestionCategory.delete({
		where:{question_category_id:Number(deleteQuestionCategoryid)},
	});
	res.json(data)
}
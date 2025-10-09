import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updatequestionid} = req.query
	const {updatequestion,updatecorrectAnswer,updatepoints,updatetimedisplay,updateanswer} = req.body
	const data = await prisma.Question.update({
		where:{question_id:Number(updatequestionid)},
		data:{
			question:updatequestion,
			correctAnswer:updatecorrectAnswer,
			points:Number(updatepoints),
			timedisplay:new Date(updatetimedisplay).toISOString(),
			answer: { set: updateanswer }, // Use set for arrays
			
		},
	});
	res.json(data)
}
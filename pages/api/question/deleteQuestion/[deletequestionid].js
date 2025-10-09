import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deletequestionid} = req.query
	console.log(req.query)

	const classId = req.query.classId;
    const subjectId = req.query.subjectId;
    const id = req.query.id;

	const data = await prisma.Question.delete({
		where:{question_id:Number(deletequestionid)},
	});

	// const question = await prisma.ClassQuestion.findUnique({
    //   where:{
    //     AND: [
    //       {question_id: Number(deletequestionid)},
    //       {class_id: Number(classId),},
    //       {teacher_id: Number(teacher.teacher_id),},
    //     ]
    //   },
    // })

	// const datas = await prisma.ClassQuestion.delete({
	// 	where:{question_id:Number(deletequestionid)},
	// });

	res.json(data)
}
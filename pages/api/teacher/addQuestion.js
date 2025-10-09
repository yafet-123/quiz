import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleadduser(req, res){
	const {Question,typeId,classId,subjectId,timedisplay,teacherId} = req.body;
	console.log(Question[0].answers)
	console.log(req.body)
	let addquestion
	let classQuestion
	for (let j = 0; j < Question.length; j++) {
		console.log(Question[j].answers)
	  	addquestion = await prisma.Question.create({
		    data:{             
  				question:Question[j].question,                
  				correctAnswer:Question[j].correctAnswer,                      
  				answer:Question[j].answers,                
  				points:Number(Question[j].points),                                
  				timedisplay:new Date(timedisplay).toISOString(),
  				Teacher: {
      				connect: { teacher_id: teacherId },
    			},
    			Subject: {
      				connect: { subject_id: Number(subjectId) },
    			},  
    			QuestionType: {
      				connect: { question_type_id: Number(typeId) },
    			},   
		    }
	  	})

	  	for (let i = 0; i < classId.length; i++) {
			classQuestion = await prisma.ClassQuestion.create({
			    data:{             
	    			teacher_id: addquestion.teacher_id,
	    			question_id: addquestion.question_id,
	    			class_id: classId[i],
	    		}
	    	})
  		}
	  	console.log(addquestion)
	}
	
	// for (const question of addquestion) {
	// 	for (let i = 0; i < classId.length; i++) {
	// 		classQuestion = await prisma.ClassQuestion.create({
	// 		    data:{             
	//     			teacher_id: question.teacher_id,
	//     			question_id: question.question_id,
	//     			class_id: classId[i],
	//     		}
	//     	})
  	// 	}
	// }

	console.log(classQuestion)
	res.json(classQuestion)
}
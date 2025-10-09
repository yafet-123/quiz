import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddRespond(req, res){
	const {content,classId,studentsId,teacherId} = req.body;
	console.log(req.body)
	let addRespond

	const data = await prisma.Communication.create({
		data:{
			content,
			isStudent:true,
			
		},
	});


	addRespond = await prisma.CommunicationRelation.create({
    	data:{             
	        Communication: {
	          	connect: { communication_id: Number(data.communication_id) },
	       	},
	       	Students: {
	          	connect: { students_id: Number(studentsId) },
	        }, 
	        Teacher:{
            	connect:{ teacher_id: Number(teacherId)},
         	}  
	    }
	 })
	
	


	console.log(addRespond)
	res.json(addRespond)
}
import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleadduser(req, res){
	const {title,content,classId,teacherId} = req.body;
	console.log(req.body)
	let addAnnouncement

	const data = await prisma.Announcement.create({
		data:{
			title,
			content,
			teacher_id:Number(teacherId)
		},
	});

	for (let j = 0; j < classId.length; j++) {
	  	addAnnouncement = await prisma.ClassAnnouncement.create({
		    data:{             
  				Announcement: {
      				connect: { announcement_id: Number(data.announcement_id) },
    			},
    			Class: {
      				connect: { class_id: Number(classId[j]) },
    			},     
		    }
	  	})
	  	console.log(addAnnouncement)
	}
	


	console.log(addAnnouncement)
	res.json(addAnnouncement)
}
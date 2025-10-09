import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateCommunicationid, param} = req.query
	const {updatetitle,updatecontent,updatestudentId} = req.body
	console.log(req.body)
	const data = await prisma.CommunicationRelation.update({
		where:{communication_relation_id:Number(param)},
		data:{
			students_id:Number(updatestudentId)
		}
	});


	const datacommunication = await prisma.Communication.update({
		where:{communication_id:Number(updateCommunicationid)},
		data:{
			title:updatetitle,
			content:updatecontent
		},
	});

	res.json(data)
}
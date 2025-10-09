import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updatecommunicationId} = req.query
	const {content} = req.body
	const data = await prisma.Communication.update({
		where:{communication_id:Number(updatecommunicationId)},
		data:{
			content
		},
	});
	res.json(data)
}
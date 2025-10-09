import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res){
	const {deleteCommunicationid, param } = req.query
	console.log(req.query)
	const deleteCommunicationdata = await prisma.CommunicationRelation.deleteMany({
		where:{communication_relation_id:Number(param)},
	})
	const data = await prisma.Communication.delete({
		where:{communication_id:Number(deleteCommunicationid)},
	});


	res.json(data)
}
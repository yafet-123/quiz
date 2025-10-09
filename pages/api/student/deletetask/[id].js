import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res){
	const {id} = req.query
	console.log(req.query)
	const data = await prisma.Task.delete({
		where:{id:Number(id)},
	});
	res.json(data)
}
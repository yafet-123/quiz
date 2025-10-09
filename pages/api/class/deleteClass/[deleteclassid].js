import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deleteclassid} = req.query
	console.log(req.query)
	const data = await prisma.Class.delete({
		where:{class_id:Number(deleteclassid)},
	});
	res.json(data)
}
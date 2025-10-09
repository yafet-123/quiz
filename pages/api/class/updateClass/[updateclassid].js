import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updateclassid} = req.query
	const {ClassName} = req.body
	const data = await prisma.Class.update({
		where:{class_id:Number(updateclassid)},
		data:{
			ClassName
		},
	});
	res.json(data)
}
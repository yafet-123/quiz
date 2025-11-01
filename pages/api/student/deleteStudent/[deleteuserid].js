import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res){
	const {deleteuserid} = req.query
	console.log(req.query)
	const data = await prisma.Student.delete({
		where:{id:Number(deleteuserid)},
	});
	res.json(data)
}
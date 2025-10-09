import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deletequarterid} = req.query
	console.log(req.query)
	const data = await prisma.Quarter.delete({
		where:{quarter_id:Number(deletequarterid)},
	});
	res.json(data)
}
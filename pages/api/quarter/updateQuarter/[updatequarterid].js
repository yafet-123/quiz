import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdatecategory(req, res){
	const {updatequarterid} = req.query
	const {quarterName} = req.body
	const data = await prisma.Quarter.update({
		where:{quarter_id:Number(updatequarterid)},
		data:{
			quarterName
		},
	});
	res.json(data)
}
import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res){
	const {deleteAnnouncementid} = req.query
	console.log(req.query)
	const deleteannouncemetdata = await prisma.ClassAnnouncement.deleteMany({
		where:{announcement_id:Number(deleteAnnouncementid)},
	})
	const data = await prisma.Announcement.delete({
		where:{announcement_id:Number(deleteAnnouncementid)},
	});


	res.json(data)
}
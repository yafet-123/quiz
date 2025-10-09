import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateAnnouncementid} = req.query
	const {updatetitle,updatecontent,updateClassId} = req.body
	const data = await prisma.Announcement.update({
		where:{announcement_id:Number(updateAnnouncementid)},
		data:{
			title:updatetitle,
			content:updatecontent
		},
	});

	const deleteannouncemetdata = await prisma.ClassAnnouncement.deleteMany({
		where:{announcement_id:Number(updateAnnouncementid)},
	});
	

	for (let j = 0; j < updateClassId.length; j++) {
	  	const newscategory = await prisma.ClassAnnouncement.create({
		    data:{
		      announcement_id : Number(updateAnnouncementid),
		      class_id : Number(updateClassId[j]),
		    }
	  	})
	}
	res.json(data)
}
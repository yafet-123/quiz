import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {subjectId, title, content, createdBy} = req.body;
	console.log(req.body)
	const data = await prisma.RevisionNote.create({
		data:{
			title,
			content,
			subjectId: Number(subjectId),
			createdBy
		},
	});

	res.json(data)
}
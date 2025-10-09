import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {SubjectName ,user_id} = req.body;
	console.log(req.body)
	const data = await prisma.Subject.create({
		data:{
			SubjectName,
			user_id
		},
	});

	res.json(data)
}
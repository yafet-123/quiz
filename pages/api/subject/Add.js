import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {SubjectName, description, svg ,user_id} = req.body;
	console.log(req.body)
	const data = await prisma.Subject.create({
		data:{
			name:SubjectName,
			description,
			svg,
			createdBy:user_id
		},
	});
	console.log(data)
	res.json(data)
}
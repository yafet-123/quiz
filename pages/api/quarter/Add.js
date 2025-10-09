import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {quarterName ,user_id} = req.body;
	console.log(req.body)
	const data = await prisma.Quarter.create({
		data:{
			quarterName,
			user_id
		},
	});

	res.json(data)
}
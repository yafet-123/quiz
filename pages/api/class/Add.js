import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {ClassName ,user_id} = req.body;
	console.log(req.body)
	const data = await prisma.Class.create({
		data:{
			ClassName,
			user_id
		},
	});

	res.json(data)
}
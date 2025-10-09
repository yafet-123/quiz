import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {questioncategoryName ,user_id} = req.body;
	console.log(req.body)
	const data = await prisma.QuestionCategory.create({
		data:{
			questioncategoryName,
			user_id
		},
	});

	res.json(data)
}
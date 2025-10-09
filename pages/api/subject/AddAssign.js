import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {questioncategoryId,subjectId,user_id} = req.body;
	console.log(req.body)

	for (let j = 0; j < questioncategoryId.length; j++) {
	  	const assignteacher = await prisma.SubjectQuestionCategory.create({
		    data:{
		      subject_id : Number(subjectId),
		      question_category_id : Number(questioncategoryId[j]),
		      user_id : Number(user_id),
		    }
	  	})
	}

	res.json("Success")
}


import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	const {classId,subjectId,user_id} = req.body;
	console.log(req.body)

	for (let j = 0; j < classId.length; j++) {
	  	const assignteacher = await prisma.ClassSubject.create({
		    data:{
		      subject_id : Number(subjectId),
		      class_id : Number(classId[j]),
		      user_id : Number(user_id),
		    }
	  	})
	}

	res.json("Success")
}


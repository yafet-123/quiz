import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
	if (req.method !== 'POST') {
    	return res.status(405).json({ error: 'Method Not Allowed' });
  	}

	try {
	    const { selectedAnswers, id, studentId, SubjectId} = req.body; 
	    console.log(SubjectId)

	    const question = await prisma.Question.findMany({
	      where:{
	        QuestionTypeQuestion:{
	        some: {
	          QuestionType:{
	            question_type_id: Number(id)
	          }
	        }
	      } 
	      },
	      orderBy: {
	        // Specify the column and the order (asc for ascending)
	        question_id: 'asc'
	      },
	      include:{
	        Subject:{
	          select:{
	            SubjectName: true
	          }
	        }
	      }
	    })

	    const Allquestion = question.map((data)=>({
    		question_id:data.question_id,
    		question:data.question,
    		correctAnswer:data.correctAnswer,
    		points:data.points,
    		answer:data.answer || null
  		}))

	    if (!selectedAnswers || !Array.isArray(selectedAnswers)) {
    		return res.status(400).json({ error: 'Invalid request body' });
  		}

 
	    let totalPoints = 0;
  		for (const userAnswer of selectedAnswers) {
  			console.log(userAnswer)
    		const question = Allquestion.find(question => question.question_id === userAnswer.question_id);
    		console.log(question)
    		if (question) {
      			const correctAnswer = question.correctAnswer;
      			const userSelectedAnswer = userAnswer.answer;

      			if (userSelectedAnswer === correctAnswer) {
      				totalPoints += userAnswer.points;
      			}
      			await prisma.UserAnswer.create({
		          data: {
		          	Students: {
      					connect: { students_id: Number(studentId)},
    				},
		            Subject: {
      					connect: { subject_id: Number(SubjectId),},
    				},
		            QuestionType:{
      					connect: { question_type_id: Number(id),},
    				},
		            Quarter: {
      					connect: { quarter_id: 1 },
    				},
    				Question: {
      					connect: {question_id: Number(userAnswer.question_id),},
    				},
		       
		            user_answer: userSelectedAnswer,
		            points: Number(userAnswer.points),
		          },
		        });
    		}
  		}

  		const mark = await prisma.Mark.create({
	      data: {
	        Students: {
      			connect: { students_id: Number(studentId)},
    		},
    		Subject: {
      			connect: { subject_id: Number(SubjectId),},
    		},
	         // Replace with the actual subject ID
    		QuestionType:{
      			connect: { question_type_id: Number(id),},
    		},
	        Quarter: {
      			connect: { quarter_id: 1 },
    		},
	        mark: Number(totalPoints),
	      },
    	});

  		console.log(mark)
  		res.status(200).json({ totalPoints })
	  } catch (error) {
	    console.error('Error adding user:', error);
	    res.status(500).json({ error: 'Internal Server Error' });
	  }
}
import { MainHeader } from "../../../../components/common/MainHeader";
import Link from "next/link"
import { prisma } from "../../../../util/db.server";

export default function BookDetail({ quizzes, subjectId }) {
  console.log(quizzes)
  return (
    <div className="antialiased bg-[#ededf2]">
      <MainHeader title={`MatricMate`} />
      <section className="px-4 py-32 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/study/practice-quizzes/${quiz.Subject.name}/question/${quiz.id}`}
            >
              <a className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
 
export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        subjectId: Number(subjectId), // 🔹 Replace with your subjectId
      },
      include: {
        Subject: {
          select: { name: true, id: true },
        },
        Questions: true,
      },
    });


    if (!quizzes.length) {
      return {
        notFound: false,
        props: { topics: [], subjectId },
      };
    }
    console.log(quizzes)
    return {
      props: {
        quizzes: JSON.parse(JSON.stringify(quizzes)),
        subjectId
      },
    };
  } catch (error) {
    console.error("Error fetching flashcard quizzes:", error);
    return {
      props: { quizzes: [], error: "Failed to load flashcard quizzes." },
    };
  }
}


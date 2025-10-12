import { MainHeader } from "../../../../components/common/MainHeader";
import { getAllQuiz, getQuizBySubject } from "../../../../data/Quiz.jsx";
import Link from "next/link"

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
              href={`/study/practice-quizzes/${subjectId}/question/${quiz.title}`}
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
 
export const getStaticProps = async (context) => {
  const subjectId = context.params.subjectId;
  const quizzes = getQuizBySubject(subjectId);

  if (!quizzes) {
    return {
      notFound: true,
    };
  }

  return {
    props: { quizzes, subjectId },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const quizes = getAllQuiz();

  // Get the paths we want to pre-render based on books
  const paths = quizes.map((quiz) => ({
    params: { subjectId: quiz.subject.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};

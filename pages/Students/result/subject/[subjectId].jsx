import { MainHeader } from "../../../../components/common/MainHeader";
import Link from "next/link";
import { prisma } from "../../../../util/db.server";
import { VerticalNavbar } from "../../../../components/student/VerticalNavbar";
import { useSession, getSession } from "next-auth/react";

export default function BookDetail({ exames, subjectId }) {
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <div className="antialiased bg-[#ededf2] min-h-screen pt-10">
      <MainHeader title="Aceit : Exam Subject Page" />
      <div className="flex bg-[#e6e6e6]">
        <VerticalNavbar onChange={handleChange} data={data} />
        <section className="px-4 py-20 max-w-4xl mx-auto w-full">
          <h2 className="text-2xl font-bold text-center mb-10">Exams</h2>

          {exames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exames.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/Students/result/${exam.Subject.name}/question/${exam.id}`}
                >
                  <a className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              There are currently no exams available for this subject. Please check back later.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { subjectId } = context.params;
  const session = await getSession(context);
  const userRole = session?.user?.role;
   if (userRole !== 'student') {
     return {
       redirect: {
         destination: '/auth/Student/Login/signin-student',
         permanent: false,
       },
     };
   }
  console.log(subjectId)
  try {
    const exames = await prisma.Exam.findMany({
      where: {
        subjectId: Number(subjectId),
      },
      include: {
        Subject: {
          select: { name: true, id: true },
        },
        Questions: true,
      },
    });

    return {
      props: {
        exames: JSON.parse(JSON.stringify(exames)),
        subjectId,
      },
    };
  } catch (error) {
    console.error("Error fetching exams:", error);
    return {
      props: { exames: [], subjectId, error: "Failed to load exams." },
    };
  }
}

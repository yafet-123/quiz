import { MainHeader } from "../../../../components/common/MainHeader";
import Link from "next/link"
import { prisma } from "../../../../util/db.server";

export default function BookDetail({ worksheetes, subjectId }) {
  console.log(worksheetes)
  return (
    <div className="antialiased bg-[#ededf2]">
      <MainHeader title={`MatricMate`} />
      <section className="px-4 py-32 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Worksheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {worksheetes.map((worksheet) => (
            <Link
              key={worksheet.id}
              href={`/study/worksheet/${worksheet.Subject.name}/question/${worksheet.id}`}
            >
              <a className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold mb-2">{worksheet.title}</h3>
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
    const worksheetes = await prisma.Worksheet.findMany({
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


    if (!worksheetes.length) {
      return {
        notFound: false,
        props: { topics: [], subjectId },
      };
    }
    console.log(worksheetes)
    return {
      props: {
        worksheetes: JSON.parse(JSON.stringify(worksheetes)),
        subjectId
      },
    };
  } catch (error) {
    console.error("Error fetching flashcard worksheetes:", error);
    return {
      props: { worksheetes: [], error: "Failed to load flashcard worksheetes." },
    };
  }
}


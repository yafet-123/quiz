import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { MainHeader } from "../../../../components/common/MainHeader";

export default function WorksheetTopics({ topics, subjectId }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Worksheet Topics" />
      <div className="py-32 px-5 lg:px-20">
        <h1 className="text-3xl font-bold mb-2">Worksheets</h1>
        <p className="text-gray-500 text-md mb-8">
          Choose a topic to view its worksheets.
        </p>

        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/study/worksheet/topic/${topic.id}`}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
              >
                <h2 className="font-bold text-xl md:text-2xl">{topic.title}</h2>
                <p className="mt-2 opacity-80">
                  {topic._count?.Worksheet || 0} worksheet(s) available
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            There are currently no worksheet topics available for this subject. Please check back later.
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const topics = await prisma.WorksheetTopic.findMany({
      where: { subjectId: Number(subjectId) },
      include: {
        _count: { select: { Worksheet: true } },
      },
      orderBy: { id: "asc" },
    });

    return {
      props: {
        topics: JSON.parse(JSON.stringify(topics)),
        subjectId,
      },
    };
  } catch (error) {
    console.error("Error fetching worksheet topics:", error);
    return {
      props: { topics: [], subjectId, error: "Failed to load worksheet topics." },
    };
  }
}

